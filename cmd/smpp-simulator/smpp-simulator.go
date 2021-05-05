package main

import (
	"log"
	"flag"
	"github.com/gofiber/fiber/v2"
	"github.com/markbates/pkger"
	
	"github.com/dinhtrung/smpptools/internal/app"
)
var configFile string

func main() {
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	flag.StringVar(&configFile, "config", "configs/smpp-simulator.yaml", "SMPP Simulator configuration file")
	flag.Parse()

	// Load configuration file and watch changes
	app.ConfigInit(configFile)
	app.ConfigWatch(configFile)

	srv := fiber.New(fiber.Config{
		BodyLimit:    50 * 1024 * 1024,
		ErrorHandler: helpers.ProblemJSONErrorHandle,
	})
	staticAsset := filesystem.New(filesystem.Config{
		Next: func(c *fiber.Ctx) bool {
			return strings.HasPrefix(c.Path(), "/api")
		},
		Root: pkger.Dir("/web"),
	})
	srv.Use(staticAsset)

	setupRoutes(srv)

	log.Fatal(srv.Listen(app.Config.String("http.listen")))
}