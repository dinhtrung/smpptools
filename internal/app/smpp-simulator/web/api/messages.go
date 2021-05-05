package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/channels"
	"github.com/gofiber/fiber/v2"
)

// MessagePost broadcast a message retrieve from customer
func MessagePost(c *fiber.Ctx) error {
	channels.WS_BROADCAST <- string(c.Body())
	return nil
}
