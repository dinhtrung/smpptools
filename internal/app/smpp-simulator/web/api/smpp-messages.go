package api

import (
	"log"

	"github.com/daominah/smpp/pdu"
	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/gofiber/fiber/v2"
)

// GetDefaultMessage print the default settings for SMPP PDU
func GetDefaultMessage(c *fiber.Ctx) error {
	req := &pdu.SubmitSm{}
	if err := app.Config.Unmarshal("smpp.pdu", req); err != nil {
		return err
	}
	return c.JSON(req)
}

// SubmitMessage send a message via selected session
func SubmitMessage(c *fiber.Ctx) error {
	sid := c.Params("sessionID")
	if sid == "" {
		for k := range services.SMPP_CLIENT_SESSIONS {
			sid = k
			break
		}
		if sid == "" {
			return fiber.NewError(fiber.StatusExpectationFailed, "no active SMPP session found")
		}
	}

	req := &pdu.SubmitSm{}
	if err := c.BodyParser(req); err != nil {
		return err
	}

	if sess, ok := services.SMPP_CLIENT_SESSIONS[sid]; ok {
		log.Printf("[%s] submit_sm >> %+v", sid, *req)
		resp, err := sess.Send(c.Context(), req)
		if err != nil {
			return err
		}
		return c.JSON(resp)
	}
	return fiber.ErrNotImplemented
}
