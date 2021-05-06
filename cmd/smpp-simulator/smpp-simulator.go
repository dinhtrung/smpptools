package main

import (
	"flag"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/websocket/v2"
	"github.com/markbates/pkger"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/api"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/web/ws"
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
		BodyLimit: 50 * 1024 * 1024,
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
	log.Fatal(srv.Listen(app.Config.String("http.listen")))
}

// setupRoutes setup the route for application
func setupRoutes(app *fiber.App) {

	app.Get("api/settings", api.GetSettings)
	app.Post("api/settings", api.SaveSettings)
	app.Get("api/start-session", api.StartSession)
	app.Post("api/start-session", api.StartSession)
	app.Get("api/sessions", api.GetSessions)
	app.Delete("api/sessions", api.StopSession)
	app.Delete("api/sessions/:sessionID", api.StopSession)
	app.Get("api/refresh-state", api.RefreshState)
	app.Get("api/send-bad-packet", api.SendBadPacket)
	app.Get("api/submit-message", api.GetDefaultMessage)
	app.Post("api/submit-message/:sessionID", api.SubmitMessage)
	app.Post("api/submit-message", api.SubmitMessage)
	app.Get("api/bulk-sending-random", api.BulkSendingRandom)
	app.Get("api/stop-bulk-sending", api.StopBulkSending)
	app.Post("api/convert-text", api.ConvertText)
}

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
