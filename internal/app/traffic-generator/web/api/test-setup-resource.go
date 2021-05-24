package api

import (
	"log"

	"github.com/dinhtrung/smpptools/internal/app/traffic-generator/instances"
	"github.com/dinhtrung/smpptools/internal/pkg/domain"
	"github.com/gofiber/fiber/v2"
)

func CreateTestSetupUsingPOST(c *fiber.Ctx) error {
	req := &domain.TestSetup{}
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if req.ID != "" {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.TestSetupRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteTestSetupUsingDELETE(c *fiber.Ctx) error {
	if err := instances.TestSetupRepo.DeleteById(c.Params("id")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllTestSetupsUsingGET(c *fiber.Ctx) error {
	entities, err := instances.TestSetupRepo.FindAll()
	if err != nil {
		log.Printf("error retrieve data: %s", err)
		return err
	}
	return c.JSON(entities)
}

func GetTestSetupUsingGET(c *fiber.Ctx) error {
	entity, err := instances.TestSetupRepo.FindById(c.Params("id"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateTestSetupUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func UpdateTestSetupUsingPUT(c *fiber.Ctx) error {
	req := &domain.TestSetup{}
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if req.ID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "exists entity should have an ID")
	}
	if err := instances.TestSetupRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}
