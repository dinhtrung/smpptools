package api

import (
	"github.com/dinhtrung/smpptools/internal/app/traffic-generator/instances"
	"github.com/dinhtrung/smpptools/internal/pkg/domain"
	"github.com/gofiber/fiber/v2"
)

func CreateTestSessionUsingPOST(c *fiber.Ctx) error {
	req := &domain.TestSession{}
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if req.ID != "" {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.TestSessionRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteTestSessionUsingDELETE(c *fiber.Ctx) error {
	if err := instances.TestSessionRepo.DeleteById(c.Params("id")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllTestSessionsUsingGET(c *fiber.Ctx) error {
	entities, err := instances.TestSessionRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(entities)
}

func GetTestSessionUsingGET(c *fiber.Ctx) error {
	entity, err := instances.TestSessionRepo.FindById(c.Params("id"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateTestSessionUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func UpdateTestSessionUsingPUT(c *fiber.Ctx) error {
	req := &domain.TestSession{}
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if req.ID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "exists entity should have an ID")
	}
	if err := instances.TestSessionRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}
