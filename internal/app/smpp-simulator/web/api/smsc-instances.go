package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func UpdateSmscInstanceUsingPUT(c *fiber.Ctx) error {
	req := openapi.NewSmscInstanceWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); ok {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.SmscInstanceRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func CreateSmscInstanceUsingPOST(c *fiber.Ctx) error {
	req := openapi.NewSmscInstanceWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); ok {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.SmscInstanceRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteSmscInstanceUsingDELETE(c *fiber.Ctx) error {
	if err := instances.SmscInstanceRepo.DeleteById(c.Params("id")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllSmscInstancesUsingGET(c *fiber.Ctx) error {
	entities, err := instances.SmscInstanceRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(entities)
}

func GetSmscInstanceUsingGET(c *fiber.Ctx) error {
	entity, err := instances.SmscInstanceRepo.FindById(c.Params("id"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateSmscInstanceUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func StartBatchOnSmscInstanceUsingPOST(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func StartSmscInstanceUsingGET(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func StopAllBatchSmscInstanceUsingDELETE(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func StopSmscInstanceUsingDELETE(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
