package api

import (
	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services/dto"
	"github.com/gofiber/fiber/v2"
)

// GetSettings return the current settings for running session
func GetSettings(c *fiber.Ctx) error {
	var profile dto.SmppConnectionProfile
	if err := app.Config.Unmarshal("smpp.client.bind", &profile); err != nil {
		return err
	}
	return c.JSON(profile)
}

// SaveSettings save the current setting into buntDB for later use
func SaveSettings(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func RefreshState(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
func SendBadPacket(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

// BulkSendingRandom start the stress-testing process
func BulkSendingRandom(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

// StopBulkSending stop the stress-testing process
func StopBulkSending(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

// ConvertText convert the PDU from UTF-8 to target codec
func ConvertText(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
