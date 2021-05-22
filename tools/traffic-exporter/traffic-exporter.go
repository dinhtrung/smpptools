package main

import (
	"flag"
	"fmt"
	"log"
	"math/rand"
	"strconv"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/knadh/koanf/providers/confmap"
	"github.com/tidwall/buntdb"
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
	flag.StringVar(&inputFile, "i", "assets/bunt.db", "Input Bunt DB file")
	flag.Parse()

	app.Config.Load(confmap.Provider(map[string]interface{}{
		"buntdb.path": inputFile,
	}, "."), nil)
	app.BuntDBInit()

	app.BuntDB.View(func(tx *buntdb.Tx) error {
		min, err := tx.Get("min", false)
		if err != nil {
			return err
		}
		max, err := tx.Get("max", false)
		if err != nil {
			return err
		}
		log.Printf("got a range for unix timestamp: %s -> %s", min, max)

		minTs, err := strconv.ParseUint(min, 10, 64)
		if err != nil {
			return err
		}

		maxTs, err := strconv.ParseUint(max, 10, 64)
		if err != nil {
			return err
		}
		log.Printf("duration: %d seconds", maxTs-minTs)

		startTs := minTs + uint64(rand.Intn(int(maxTs-minTs)))

		cnt := 0
		tx.AscendGreaterOrEqual("", fmt.Sprintf("tps:%d", startTs), func(key, value string) bool {

			ts, err := strconv.ParseUint(key[4:], 10, 64)
			if err != nil {
				return false
			}
			log.Printf("TPS should use after %d second from start : %s SMS", ts-minTs, value)
			cnt++
			return cnt < 10
		})
		return nil
	})
}
