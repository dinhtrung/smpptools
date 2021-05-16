package main

import (
	"flag"
	"log"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/websocket/v2"
	"github.com/markbates/pkger"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/impl"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/api"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/ws"
	"github.com/dinhtrung/smpptools/internal/pkg/esme"
)

var configFile string

func main() {
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	flag.StringVar(&configFile, "config", "configs/smpp-simulator.yaml", "SMPP Simulator configuration file")
	flag.Parse()

	// set default settings
	app.BuntDBConfig()

	// Load configuration file and watch changes
	app.ConfigInit(configFile)
	app.ConfigWatch(configFile)

	// bring up components
	app.BuntDBInit()

	// autowire repository
	setupDB()

	// setup fiber

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
	staticAsset := filesystem.New(filesystem.Config{
		Next: func(c *fiber.Ctx) bool {
			return strings.HasPrefix(c.Path(), "/api")
		},
		Root: pkger.Dir("/web/smpp-simulator"),
	})
	srv.Use(staticAsset)
	srv.Use(logger.New(logger.Config{
		// Format:     "{\"timestamp\":\"${time}\", \"status\":${status}, \"account\":\"${locals:account}\", \"method\":\"${method}\", \"path\":\"${path}\", \"body\":${body}}\n",
		// Format:     "${time} ${status} ${locals:account} ${method} ${path} '${queryParams}' '${body}'\n",
		TimeFormat: "2006-01-02T15:04:05-0700",
	}))

	setupWebSocket(srv)
	setupRoutes(srv)

	esme.ENQUIRELINK_TIMER = time.NewTicker(time.Duration(15) * time.Second)
	defer esme.ENQUIRELINK_TIMER.Stop()
	log.Fatal(srv.Listen(app.Config.String("http.listen")))
}

// setupDB wire the Repository implement back to its interface
func setupDB() {
	instances.BaseSmRepo = impl.NewBaseSmRepository()
	instances.EsmeAccountRepo = impl.NewEsmeAccountRepository()
	instances.EsmeSessionRepo = impl.NewEsmeSessionRepository()
	instances.SmscAccountRepo = impl.NewSmscAccountRepository()
	instances.SmscInstanceRepo = impl.NewSmscInstanceRepository()
	instances.IsdnListRepo = impl.NewIsdnListRepository()
	instances.ThroughputSeriesRepo = impl.NewThroughputSeriesRepository()
}

// setupRoutes setup the route for application
func setupRoutes(app *fiber.App) {

	// + SMPP actions
	// -- base-sm-resource
	app.Post("/api/base-sms", api.CreateBaseSmUsingPOST)
	app.Delete("/api/base-sms/:id", api.DeleteBaseSmUsingDELETE)
	app.Get("/api/base-sms", api.GetAllBaseSmsUsingGET)
	app.Get("/api/base-sms/:id", api.GetBaseSmUsingGET)
	app.Patch("/api/base-sms/:id", api.PartialUpdateBaseSmUsingPATCH)
	app.Put("/api/base-sms/:id", api.UpdateBaseSmUsingPUT)

	app.Delete("/api/esme-accounts/:id/batch", api.ApiEsmeAccountsIdBatchDelete)
	app.Post("/api/esme-accounts", api.CreateEsmeAccountUsingPOST)
	app.Delete("/api/esme-accounts/:id", api.DeleteEsmeAccountUsingDELETE)
	app.Get("/api/esme-accounts", api.GetAllEsmeAccountsUsingGET)
	app.Get("/api/esme-accounts/:id", api.GetEsmeAccountUsingGET)
	app.Patch("/api/esme-accounts/:id", api.PartialUpdateEsmeAccountUsingPATCH)
	app.Post("/api/esme-accounts/:id/send-mt", api.SendMobileTerminatedSMSOnAccountUsingPOST)
	app.Post("/api/esme-accounts/:id/batch", api.SendSMSonSMSCsessionUsingPOST)
	app.Delete("/api/esme-accounts/:id/stop-all", api.StopAllEsmeSessionsForAccountUsingDELETE)
	app.Put("/api/esme-accounts/:id", api.UpdateEsmeAccountUsingPUT)
	app.Post("/api/esme-sessions", api.CreateEsmeSessionUsingPOST)
	app.Delete("/api/esme-sessions/:sessionID", api.DeleteEsmeSessionUsingDELETE)
	app.Get("/api/esme-sessions", api.GetAllEsmeSessions)
	app.Get("/api/esme-sessions/:sessionID", api.GetEsmeSessionUsingGET)
	app.Patch("/api/esme-sessions/:sessionID", api.PartialUpdateEsmeSessionUsingPATCH)
	app.Post("/api/esme-sessions/:id/batch", api.SendSMSonEsmeSessionUsingPOST)
	app.Delete("/api/esme-sessions/:id/batch", api.StopAllBachOnEsmeSessionUsingDELETE)
	app.Put("/api/esme-sessions/:sessionID", api.UpdateEsmeSessionUsingPUT)
	app.Post("/api/isdn-lists", api.CreateIsdnListUsingPOST)
	app.Delete("/api/isdn-lists/:id", api.DeleteIsdnListUsingDELETE)
	app.Get("/api/isdn-lists", api.GetAllIsdnListsUsingGET)
	app.Get("/api/isdn-lists/:id", api.GetIsdnListUsingGET)
	app.Patch("/api/isdn-lists/:id", api.PartialUpdateIsdnListUsingPATCH)
	app.Put("/api/isdn-lists/:id", api.UpdateIsdnListUsingPUT)
	app.Post("/api/smsc-accounts", api.CreateSmscAccountUsingPOST)
	app.Delete("/api/smsc-accounts/:id", api.DeleteSmscAccountUsingDELETE)
	app.Get("/api/smsc-accounts", api.GetAllSmscAccountsUsingGET)
	app.Get("/api/smsc-accounts/:id", api.GetSmscAccountUsingGET)
	app.Patch("/api/smsc-accounts/:id", api.PartialUpdateSmscAccountUsingPATCH)
	app.Post("/api/smsc-accounts/:id/send-mo", api.SendMobileOriginatedSMSOnAccountUsingPOST)
	app.Delete("/api/smsc-accounts/:id/stop-all", api.StopAllSessionsForSmscAccountUsingDELETE)
	app.Put("/api/smsc-accounts/:id", api.UpdateSmscAccountUsingPUT)
	app.Post("/api/smsc-instances", api.CreateSmscInstanceUsingPOST)
	app.Delete("/api/smsc-instances/:id", api.DeleteSmscInstanceUsingDELETE)
	app.Get("/api/smsc-instances", api.GetAllSmscInstancesUsingGET)
	app.Get("/api/smsc-instances/:id", api.GetSmscInstanceUsingGET)
	app.Patch("/api/smsc-instances/:id", api.PartialUpdateSmscInstanceUsingPATCH)
	app.Post("/api/smsc-instances/:id/batch", api.StartBatchOnSmscInstanceUsingPOST)
	app.Get("/api/smsc-instances/:id/start", api.StartSmscInstanceUsingGET)
	app.Delete("/api/smsc-instances/:id/batch", api.StopAllBatchSmscInstanceUsingDELETE)
	app.Delete("/api/smsc-instances/:id/stop", api.StopSmscInstanceUsingDELETE)
	app.Put("/api/smsc-instances/:id", api.UpdateSmscInstanceUsingPUT)
	app.Delete("/api/smsc-sessions/:id/batch", api.ApiSmscSessionsIdBatchDelete)
	app.Delete("/api/smsc-sessions/:id/stop", api.ApiSmscSessionsIdStopDelete)
	app.Delete("/api/smsc-sessions/:id", api.DeleteSmscSessionUsingDELETE)
	app.Get("/api/smsc-sessions", api.GetAllSmscSessions)
	app.Get("/api/smsc-sessions/:id", api.GetSmscSessionUsingGET)
	app.Patch("/api/smsc-sessions/:id", api.PartialUpdateSmscSessionUsingPATCH)
	app.Post("/api/smsc-sessions/:id/send-mo", api.SendMobileOriginatedSMSUsingPOST)
	app.Post("/api/smsc-sessions/:id/batch", api.SendSMSonSmscSessionUsingPOST)
	app.Put("/api/smsc-sessions/:id", api.UpdateSmscSessionUsingPUT)
	app.Post("/api/throughput-series", api.CreateThroughputSeriesUsingPOST)
	app.Delete("/api/throughput-series/:id", api.DeleteThroughputSeriesUsingDELETE)
	app.Get("/api/throughput-series", api.GetAllThroughputSeriessUsingGET)
	app.Get("/api/throughput-series/:id", api.GetThroughputSeriesUsingGET)
	app.Get("/api/throughput-series/:id/transform/{variantID}", api.GetVariantThroughputSeriesUsingGET)
	app.Patch("/api/throughput-series/:id", api.PartialUpdateThroughputSeriesUsingPATCH)
	app.Put("/api/throughput-series/:id", api.UpdateThroughputSeriesUsingPUT)

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
