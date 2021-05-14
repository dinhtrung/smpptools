package app

import (
	"log"

	"github.com/knadh/koanf/providers/confmap"
	"github.com/tidwall/buntdb"
)

var (
	// DBConn hold the connection to database
	BuntDB *buntdb.DB
)

// BuntDBConfig configure application runtime
func BuntDBConfig() {
	// koanf defautl values
	Config.Load(confmap.Provider(map[string]interface{}{
		"buntdb.path": "assets/bunt.db",
	}, "."), nil)
}

// BuntDBInit initiate database
func BuntDBInit() {
	var err error
	log.Printf("Connecting to database: %s", Config.MustString("buntdb.path"))
	dbconn, err := buntdb.Open(Config.String("buntdb.path"))
	if err != nil {
		log.Fatalf("failed to connect database: %s", err)
	}
	BuntDB = dbconn
	log.Println("connected to BuntDB")
}
