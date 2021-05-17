package api

import (
	"context"

	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/dinhtrung/smpptools/internal/pkg/smsc"
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

// Start selected SMSC Instance
func StartSmscInstanceUsingGET(c *fiber.Ctx) error {
	entity, err := instances.SmscInstanceRepo.FindById(c.Params("instanceID"))
	if err != nil {
		return err
	}
	instance := smsc.NewSmscSimulatorInstance(entity)
	go instance.Start(context.Background())
	return c.JSON(entity)
}

func StopAllBatchSmscInstanceUsingDELETE(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func StopSmscInstanceUsingDELETE(c *fiber.Ctx) error {
	instanceID := c.Params("instanceID")
	entity, err := instances.SmscInstanceRepo.FindById(instanceID)
	if err != nil {
		return err
	}
	instance, ok := services.SMSC_INSTANCES[entity.GetPort()]
	if !ok {
		return fiber.ErrNotFound
	}
	instance.Close()
	delete(services.SMSC_INSTANCES, entity.GetPort())
	return c.SendStatus(fiber.StatusNoContent)
}
