package api

import (
	"context"
	"log"

	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services/dto"
	"github.com/gofiber/fiber/v2"
)

// StartSession start the current sessions from binding configuration
func StartSession(c *fiber.Ctx) error {
	var info dto.SmppConnectionProfile
	if err := c.BodyParser(&info); err != nil {
		return err
	}
	ctx, cancel := context.WithCancel(context.Background())
	if err := info.Bind(ctx); err != nil {
		defer cancel()
		return err
	}
	services.SMPP_SESSIONS[info.Session.ID()] = &cancel
	return c.Status(fiber.StatusAccepted).JSON(info)
}

// StopSession stop the current sessions
func StopSession(c *fiber.Ctx) error {
	sid := c.Params("sessionID")
	if cancelFunc, ok := services.SMPP_SESSIONS[sid]; ok {
		(*cancelFunc)()
		return c.SendStatus(fiber.StatusAccepted)
	}
	return fiber.NewError(fiber.StatusNotFound, "invalid session ID")
}

// StopSession stop the current sessions
func StopAllSession(c *fiber.Ctx) error {
	for k, v := range services.SMPP_SESSIONS {
		log.Printf("stopping session: %s", k)
		(*v)()
	}
	return c.SendStatus(fiber.StatusAccepted)
}

// GetSessions return list of available sessions
func GetSessions(c *fiber.Ctx) error {
	resp := make(map[string]string)
	for k, v := range services.SMPP_CLIENT_SESSIONS {
		resp[k] = v.String()
	}
	return c.JSON(resp)
}
