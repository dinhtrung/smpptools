package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func ApiSmscSessionsIdBatchDelete(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func ApiSmscSessionsIdStopDelete(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func GetAllSmscSessions(c *fiber.Ctx) error {
	result, err := instances.SmscSessionRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(result)
}

func GetSmscSessionUsingGET(c *fiber.Ctx) error {
	sid := c.Params("sessionID")
	if sid == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing session ID")
	}
	if _, ok := services.SMPP_CLIENT_SESSIONS[sid]; !ok {
		return fiber.NewError(fiber.StatusExpectationFailed, "cannot query session info")
	}
	entity, err := instances.SmscSessionRepo.FindById(sid)
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func DeleteSmscSessionUsingDELETE(c *fiber.Ctx) error {
	sid := c.Params("sessionID")
	if sid == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing session ID")
	}
	session, ok := services.SMPP_CLIENT_SESSIONS[sid]
	if !ok {
		return fiber.NewError(fiber.StatusExpectationFailed, "cannot query session info")
	}
	if err := session.Close(); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "cannot close session")
	}
	if err := instances.SmscSessionRepo.DeleteById(sid); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func UpdateSmscSessionUsingPUT(c *fiber.Ctx) error {
	sid := c.Params("sessionID")
	if sid == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing session ID")
	}
	session, ok := services.SMPP_CLIENT_SESSIONS[sid]
	if !ok {
		return fiber.NewError(fiber.StatusExpectationFailed, "cannot query session info")
	}
	entity, err := instances.SmscSessionRepo.FindById(sid)
	if err != nil {
		return err
	}
	updated := openapi.NewSmscSession(sid)
	if err := c.BodyParser(updated); err != nil {
		return err
	}
	entity.SetAccount(*updated.Account)
	entity.SetLocalAddr(session.LocalAddr())
	entity.SetRemoteAddr(session.RemoteAddr())
	if err := instances.SmscSessionRepo.Save(entity); err != nil {
		return err
	}
	return c.JSON(entity)

}

func PartialUpdateSmscSessionUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func SendMobileOriginatedSMSUsingPOST(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func SendSMSonSmscSessionUsingPOST(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
