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
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services/dto"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/api"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/rest"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/ws"
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
		Root: pkger.Dir("/web"),
	})
	srv.Use(staticAsset)
	srv.Use(logger.New(logger.Config{
		// Format:     "{\"timestamp\":\"${time}\", \"status\":${status}, \"account\":\"${locals:account}\", \"method\":\"${method}\", \"path\":\"${path}\", \"body\":${body}}\n",
		// Format:     "${time} ${status} ${locals:account} ${method} ${path} '${queryParams}' '${body}'\n",
		TimeFormat: "2006-01-02T15:04:05-0700",
	}))

	setupWebSocket(srv)
	setupRoutes(srv)
	setupSmpp()

	dto.ENQUIRELINK_TIMER = time.NewTicker(time.Duration(15) * time.Second)
	defer dto.ENQUIRELINK_TIMER.Stop()
	log.Fatal(srv.Listen(app.Config.String("http.listen")))
}

// setupRoutes setup the route for application
func setupRoutes(app *fiber.App) {

	// + SMPP actions
	app.Get("api/settings", api.GetSettings)
	app.Post("api/settings", api.SaveSettings)

	// + api for control ESME sessions
	app.Get("api/esme-sessions", api.GetSessions)
	app.Post("api/esme-sessions", api.StartSession)
	app.Delete("api/esme-sessions/:sessionID", api.StopSession)
	app.Delete("api/esme-sessions", api.StopAllSession)

	// + api for submit SMS into app
	app.Get("api/submit-message", api.GetDefaultMessage)
	app.Post("api/submit-message", api.SubmitMessage)
	app.Put("api/submit-message/:sessionID", api.SubmitMessageOnSession)

	app.Get("api/refresh-state", api.RefreshState)
	app.Get("api/send-bad-packet", api.SendBadPacket)
	app.Get("api/bulk-sending-random", api.BulkSendingRandom)
	app.Get("api/stop-bulk-sending", api.StopBulkSending)
	app.Post("api/convert-text", api.ConvertText)

	// + CRUD API for SMPP Profiles
	app.Get("api/esme-profiles", rest.GetAllSmppConnectionProfile)
	app.Get("api/esme-profiles/:id", rest.GetSmppConnectionProfile)
	app.Post("api/esme-profiles", rest.NewSmppConnectionProfile)
	app.Delete("api/esme-profiles/:id", rest.DeleteSmppConnectionProfile)
	app.Delete("api/admin/esme-profiles", rest.DeleteAllSmppConnectionProfile)
	app.Post("api/import/esme-profiles", rest.ImportJSONSmppConnectionProfile)

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

// setupSmpp setup utilities for SMPP apps
func setupSmpp() {

}
