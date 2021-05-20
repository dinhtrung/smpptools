package main

import (
	"encoding/csv"
	"encoding/json"
	"flag"
	"io"
	"log"
	"os"
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

	var startTime time.Time
	result := openapi.ThroughputSeries{Name: inputFile}
	result.SetDatafile(inputFile)
	result.SetDescription("data imported from " + inputFile)
	result.SetName(inputFile)
	result.SetState(0)
	values := make([]int32, 0)
	lineNo := 0
	lastLineNo := 1
	windowSize := time.Second
	// TODO: Add sorted by the 3rd column
	r := csv.NewReader(file)
	for {
		record, err := r.Read()
		if err == io.EOF {
			values = append(values, int32(lineNo-lastLineNo)+1)
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		lineNo++
		// skip first row
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
	result.SetValues(values)
	if jsondata, err := json.Marshal(result); err == nil {
		log.Printf("final result: %s", string(jsondata))
	}
}
