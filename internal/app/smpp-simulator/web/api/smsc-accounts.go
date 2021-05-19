package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func UpdateSmscAccountUsingPUT(c *fiber.Ctx) error {
	req := openapi.NewSmscAccountWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); !ok {
		return fiber.NewError(fiber.StatusBadRequest, "missing ID")
	}
	if err := instances.SmscAccountRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func CreateSmscAccountUsingPOST(c *fiber.Ctx) error {
	req := openapi.NewSmscAccountWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); ok {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.SmscAccountRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteSmscAccountUsingDELETE(c *fiber.Ctx) error {
	if err := instances.SmscAccountRepo.DeleteById(c.Params("id")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllSmscAccountsUsingGET(c *fiber.Ctx) error {
	entities, err := instances.SmscAccountRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(entities)
}

func GetSmscAccountUsingGET(c *fiber.Ctx) error {
	entity, err := instances.SmscAccountRepo.FindById(c.Params("id"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateSmscAccountUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func SendMobileOriginatedSMSOnAccountUsingPOST(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func StopAllSessionsForSmscAccountUsingDELETE(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
