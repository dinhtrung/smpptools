package main

import (
	"encoding/csv"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"sort"
	"time"

	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
)

var inputFile string

const (
	colCallingNumber = iota
	colCalledNumber
	colDeliveryTime
	colOriginatingMSCAddress
	colDestinationMSCAddress
	colState
	colRecordType
	colStructureCode
	colCallingTonAPI
	colCalledTonAPI
	colMessageSubmissionTime
	colMessageSubmissionTimeTZOffset
	colMessageDeliveryTimeTimeTZOffset
	colCallReference
	colMessageLength
	colPriority
	colDeferred
	colReceipt
	colNumberOfAttempts
	colProtocolID
	colMappedNetworkError
	colLocalError
	colMessageStatus
	colCauseForTermination
	colContent
)

func main() {
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	flag.StringVar(&inputFile, "i", "", "The input to check")
	flag.Parse()

	file, err := os.Open(inputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	csvReader := csv.NewReader(file)
	if _, err := csvReader.Read(); err != nil {
		log.Fatal(err)
	}
	records, err := csvReader.ReadAll()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	sort.Slice(records, func(i, j int) bool {
		return records[i][colDeliveryTime] < records[j][colDeliveryTime]
	})

	var startTime time.Time
	result := openapi.ThroughputSeries{Name: inputFile}
	result.SetDatafile(inputFile)
	result.SetDescription("data imported from " + inputFile)
	result.SetName(inputFile)
	result.SetState(0)
	values := make([]int32, 0)
	lastLineNo := 0
	windowSize := time.Second

	for lineNo, record := range records {
		if t, err := time.Parse("060102150405", record[colDeliveryTime]); err == nil {
			if t.Sub(startTime) >= windowSize {
				log.Printf("%s offset: %d - %d", record[colDeliveryTime], lineNo, lastLineNo)
				if lineNo > lastLineNo {
					values = append(values, int32(lineNo-lastLineNo))
					lastLineNo = lineNo
				}
				startTime = t
			}
		} else {
			log.Printf("unable to parse value: %s", record[colDeliveryTime])
			lastLineNo = lineNo + 1
		}
	}
	values = append(values, int32(len(records)-lastLineNo))
	result.SetValues(values)
	if jsondata, err := json.Marshal(result); err == nil {
		log.Printf("final result: %s", string(jsondata))
	}
}
