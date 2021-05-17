package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/dinhtrung/smpptools/internal/pkg/esme"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func CreateEsmeSessionUsingPOST(c *fiber.Ctx) error {
	req := openapi.NewEsmeSessionWithDefaults()
	req.Account = openapi.NewEsmeAccountWithDefaults()
	if err := c.BodyParser(req.Account); err != nil {
		return err
	}
	conn := esme.NewEsmeSimulator(req)
	if err := conn.Start(); err != nil {
		return err
	}
	return c.JSON(req)
}

func UpdateEsmeSessionUsingPUT(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func DeleteEsmeSessionUsingDELETE(c *fiber.Ctx) error {
	sid := c.Params("sessionID")
	conn, ok := services.SMPP_CLIENT_SESSIONS[sid]
	if !ok {
		return fiber.ErrNotFound
	}
	if err := conn.Close(); err != nil {
		return err
	}
	instances.EsmeSessionRepo.DeleteById(sid)
	return c.SendStatus(fiber.StatusNoContent)
}
func GetAllEsmeSessions(c *fiber.Ctx) error {
	result, err := instances.EsmeSessionRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(result)
}
func GetEsmeSessionUsingGET(c *fiber.Ctx) error {
	sid := c.Params("sessionID")
	if sid == "" {
		return fiber.ErrBadRequest
	}
	_, ok := services.SMPP_CLIENT_SESSIONS[sid]
	if !ok {
		return fiber.ErrNotFound
	}
	entity, err := instances.EsmeSessionRepo.FindById(sid)
	if err != nil {
		return err
	}
	return c.JSON(entity)
}
func PartialUpdateEsmeSessionUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
func SendSMSonEsmeSessionUsingPOST(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
func StopAllBachOnEsmeSessionUsingDELETE(c *fiber.Ctx) error {
	results := make([]string, 0)
	for sid, sess := range services.SMPP_CLIENT_SESSIONS {
		if err := sess.Close(); err == nil {
			results = append(results, sid)
		}
	}
	return c.JSON(results)
}
