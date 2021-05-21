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

	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
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

	startTime := time.Now()
	log.Printf("Importing file to %s: %s ", outputFile, inputFile)
	file, err := os.Open(inputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	outfile, err := os.OpenFile(outputFile, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	if err != nil {
		log.Fatal(err)
	}
	defer outfile.Close()

	enc := msgpack.NewEncoder(outfile)

	var wg sync.WaitGroup

	outputChannel := make(chan *openapi.BaseSm)

	for i := 0; i < workerInstances; i++ {
		wg.Add(1)
		go worker(outputChannel, &wg, enc)
	}

	//make new msisdn list
	cr := csv.NewReader(file)
	cnt := 0
	tps := make(map[int64]int)
	for {
		// Read each record from *.csv file
		row, err := cr.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		if len(row) < 2 {
			log.Fatal("invalid data on file - len row <1")
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
			cnt++
		}
	}

	wg.Wait()
	close(outputChannel)

	endTime := time.Now()
	log.Printf("Total rows %d,  seconds %d, total seconds %d", cnt, endTime.Unix()-startTime.Unix(), len(tps))

	outfile2, err := os.OpenFile(outputFile+".tps", os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	if err != nil {
		log.Fatal(err)
	}
	defer outfile2.Close()
	enc2 := msgpack.NewEncoder(outfile2)
	if err := enc2.Encode(tps); err != nil {
		log.Printf("error writing tps data %s", err)
		fmt.Printf("%+v", tps)
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

func worker(jobs <-chan *openapi.BaseSm, wg *sync.WaitGroup, enc *msgpack.Encoder) {
	defer wg.Done()
	for row := range jobs {
		if err := enc.Encode(row); err != nil {
			log.Fatal(err)
			return
		}
	}
}
