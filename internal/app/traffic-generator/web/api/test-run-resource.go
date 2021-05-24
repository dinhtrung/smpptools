package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func CreateTestRunUsingPOST(c *fiber.Ctx) error {
	req := openapi.NewTestRunWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); ok {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.TestRunRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteTestRunUsingDELETE(c *fiber.Ctx) error {
	if err := instances.TestRunRepo.DeleteById(c.Params("id")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllTestRunsUsingGET(c *fiber.Ctx) error {
	entities, err := instances.TestRunRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(entities)
}

func GetTestRunUsingGET(c *fiber.Ctx) error {
	entity, err := instances.TestRunRepo.FindById(c.Params("id"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateTestRunUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func UpdateTestRunUsingPUT(c *fiber.Ctx) error {
	req := openapi.NewTestRunWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); !ok {
		return fiber.NewError(fiber.StatusBadRequest, "exists entity should have an ID")
	}
	if err := instances.TestRunRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}
