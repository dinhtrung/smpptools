package main

import (
	"encoding/csv"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/brianvoe/gofakeit/v6"
)

var (
	outFile   = "account.csv"
	accountNo = 10
)

func main() {
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	flag.StringVar(&outFile, "o", outFile, "output CSV File")
	flag.IntVar(&accountNo, "n", accountNo, "number of accounts to generate")
	flag.Parse()

	file, err := os.Create(outFile)
	checkError("Cannot create file", err)
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	gofakeit.Seed(time.Now().UnixNano())
	for i := 0; i < accountNo; i++ {
		value := []string{
			gofakeit.RandomString([]string{"HTTP", "SMPP"}),
			gofakeit.Username(),
			gofakeit.Password(true, true, true, true, false, 8),
			gofakeit.AppName(),
			fmt.Sprint(gofakeit.Number(1, 10)),
		}
		err := writer.Write(value)
		checkError("Cannot write to file", err)
	}
}

func checkError(message string, err error) {
	if err != nil {
		log.Fatal(message, err)
	}
}
