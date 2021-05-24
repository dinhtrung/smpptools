package main

import (
	"context"
	"flag"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/api"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/ws"
	trafficApi "github.com/dinhtrung/smpptools/internal/app/traffic-generator/web"
	"github.com/dinhtrung/smpptools/internal/pkg/esme"
	"github.com/dinhtrung/smpptools/internal/pkg/smsc"
	"github.com/dinhtrung/smpptools/pkg/fiber/authjwt"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
)

var configFile string

func main() {
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	flag.StringVar(&configFile, "config", "configs/traffic-generator.yaml", "Traffic Generator config files")
	flag.Parse()

	// set default settings
	app.BuntDBConfig()
	app.S3Config()

	// Load configuration file and watch changes
	app.ConfigInit(configFile)
	app.ConfigWatch(configFile)

	// bring up components
	app.BuntDBInit()
	app.S3Init()

	srv := fiber.New(fiber.Config{
		BodyLimit: 50 * 1024 * 1024,
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
				return c.Status(code).JSON(e)
			}
			return c.Status(code).JSON(fiber.Map{"error": code, "message": err.Error()})
		},
	})

	authjwt.SetupAuthJWT(srv, app.Config.MustString("security.jwt-secret"))
	setupWebSocket(srv)
	setupRoutes(srv)

	if app.Config.String("https.listen") != "" {
		go log.Fatal(srv.ListenTLS(app.Config.String("https.listen"), app.Config.MustString("https.cert"), app.Config.MustString("https.key")))
	}
	log.Fatal(srv.Listen(app.Config.String("http.listen")))
}

// setupRoutes setup the route for application
func setupRoutes(app *fiber.App) {
	// + SMPP actions
	app.Get("/management/health", performHealthCheck)
	app.Get("/management/info", performHealthCheck)

	trafficApi.SetupRepositories()
	trafficGeneratorService := app.Group("/api", authjwt.HasAuthority("SALES"))
	trafficApi.SetupRoutes(trafficGeneratorService)

}

// setupWebSocket for push message back to browser
func setupWebSocket(app *fiber.App) {

	app.Use(func(c *fiber.Ctx) error {
		if strings.HasPrefix(c.Path(), "/ws") {
			if websocket.IsWebSocketUpgrade(c) { // Returns true if the client requested upgrade to the WebSocket protocol
				return c.Next()
			}
			return c.SendStatus(fiber.StatusUpgradeRequired)
		}
		return c.Next()
	})

	go ws.RunHub()
	app.Get("/ws", websocket.New(ws.WebsocketHandle))
	app.Post("api/ws", api.MessagePost)

}

func startPersistSmscInstances() {
	entities, err := instances.SmscInstanceRepo.FindAll()
	if err != nil {
		log.Fatal(err)
	}
	for _, entity := range entities {
		if entity.GetIsPersist() {
			instance := smsc.NewSmscSimulatorInstance(entity)
			go instance.Start(context.Background())
		}
	}
}

func startPersistEsmeAccounts() {
	entities, err := instances.EsmeAccountRepo.FindAll()
	if err != nil {
		log.Fatal(err)
	}
	for _, entity := range entities {
		if entity.GetIsPersist() {
			numBinds := int(entity.GetNumBinds())
			if numBinds <= 0 {
				numBinds = 1
			}
			for cnt := 0; cnt < numBinds; cnt++ {
				sessionInfo := &openapi.EsmeSession{Account: entity}
				instance := esme.NewEsmeSimulator(sessionInfo)
				go instance.Start()
			}
		}
	}
}

func performHealthCheck(c *fiber.Ctx) error {
	return c.SendStatus(fiber.StatusOK)
}
