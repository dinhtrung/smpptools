package main

import (
	"encoding/csv"

	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/knadh/koanf/providers/confmap"
	"github.com/tidwall/buntdb"
	"github.com/vmihailenco/msgpack/v5"
)

var (
	inputFile, outputFile string
	workerInstances       = 50
)

// CSV Columns
const (
	START = iota
	TYPE
	SOURCEADDRESS
	SOURCETON
	SOURCENPI
	DESTADDRESS
	DESTTON
	DESTNPI
	END
	PROTOCOLID
	DATACODING
	STATE
	INHOST
	OUTHOST
	MESSAGEID
	COMMANDSTATUS
	COMMANDID
	TEXT
	INSEQ
	OUTSEQ
	ID
	OUTSYSTEMID
	INSYSTEMID
)

// main function
func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	flag.StringVar(&inputFile, "i", "input.txt", "Input File contains MSISDN")
	flag.StringVar(&outputFile, "o", "assets/bunt.db", "Bunt DB path")
	flag.IntVar(&workerInstances, "w", workerInstances, "Number of workers to run in parallel")
	flag.Parse()

	app.Config.Load(confmap.Provider(map[string]interface{}{
		"buntdb.path": outputFile,
	}, "."), nil)
	app.BuntDBInit()

	startTime := time.Now()
	log.Printf("Importing file to %s: %s ", outputFile, inputFile)
	file, err := os.Open(inputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var wg sync.WaitGroup

	outputChannel := make(chan *openapi.BaseSm)

	for i := 0; i < workerInstances; i++ {
		wg.Add(1)
		go worker(outputChannel, &wg)
	}
	//make new msisdn list
	cr := csv.NewReader(file)
	cnt := 0
	tps := make(map[int64]int)
	minTs := time.Now()
	maxTs := time.Time{}
	for {
		// Read each record from *.csv file
		row, err := cr.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		// skip first row
		if ts, err := time.Parse("20060102150405", row[START]); err == nil {
			r, err := ParseRecord(row)
			if err != nil {
				continue
			}
			outputChannel <- r
			if val, ok := tps[ts.Unix()]; !ok {
				tps[ts.Unix()] = 1
			} else {
				tps[ts.Unix()] = val + 1
			}
			if ts.Before(minTs) {
				minTs = ts
			}
			if ts.After(maxTs) {
				maxTs = ts
			}
			cnt++
		}

	}
	close(outputChannel)
	wg.Wait()
	endTime := time.Now()
	log.Printf("Total rows %d,  seconds %d", cnt, endTime.Unix()-startTime.Unix())

	log.Printf("time range: %s -> %s", minTs.Format(time.RFC3339), maxTs.Format(time.RFC3339))

	// Finally store the TPS
	err = app.BuntDB.Update(func(tx *buntdb.Tx) error {
		tx.Set("min", fmt.Sprint(minTs.Unix()), nil)
		tx.Set("max", fmt.Sprint(maxTs.Unix()), nil)
		for k, v := range tps {
			if _, _, err := tx.Set(fmt.Sprintf("tps:%d", k), fmt.Sprint(v), nil); err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		log.Fatal(err)
	}
}

func ParseRecord(row []string) (*openapi.BaseSm, error) {
	res := openapi.NewBaseSm()
	res.SetId(row[START] + ":" + row[ID])
	if val, err := strconv.Atoi(row[DATACODING]); err == nil {
		res.SetDataCoding(val)
	}
	// res.SetDefaultMessageID(row[ID])
	res.SetDestinationAddr(row[DESTADDRESS])
	if npi, err := strconv.Atoi(row[DESTNPI]); err == nil {
		res.SetDestinationNPI(npi)
	}
	if ton, err := strconv.Atoi(row[DESTTON]); err == nil {
		res.SetDestinationTON(ton)
	}
	if npi, err := strconv.Atoi(row[SOURCENPI]); err == nil {
		res.SetSourceNPI(npi)
	}
	if ton, err := strconv.Atoi(row[SOURCETON]); err == nil {
		res.SetSourceTON(ton)
	}
	switch row[TYPE] {
	case "TRX":
		res.SetEsmClass(3)
		res.SetRegisteredDelivery(1)
	case "TX":
		res.SetEsmClass(0)
	case "RX":
		res.SetEsmClass(0)
	}
	// res.SetEsmClass(row[])
	// res.SetPriorityFlag(row[])
	if val, err := strconv.Atoi(row[PROTOCOLID]); err == nil {
		res.SetProtocolID(val)
	}
	// res.SetReplaceIfPresentFlag(row[])
	// res.SetScheduleDeliveryTime(row[])
	// res.SetServiceType(row[])
	// res.SetValidityPeriod(row[])
	// res.SetCharset(row[])
	res.SetText(row[TEXT])
	// res.SetShortMessages(row[])
	// res.SetIsConcatTLV(row[])
	// res.SetTlvList(row[])
	return res, nil
}

func worker(jobs <-chan *openapi.BaseSm, wg *sync.WaitGroup) {
	defer wg.Done()
	app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for data := range jobs {
			if val, err := msgpack.Marshal(data); err == nil {
				_, _, err := tx.Set(data.GetId(), string(val), nil)
				if err != nil {
					return err
				}
			}
		}
		return nil
	})
}
