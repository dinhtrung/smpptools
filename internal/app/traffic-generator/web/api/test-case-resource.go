package api

import (
	"github.com/dinhtrung/smpptools/internal/app/traffic-generator/instances"
	"github.com/dinhtrung/smpptools/internal/pkg/domain"
	"github.com/gofiber/fiber/v2"
)

func CreateTestCaseUsingPOST(c *fiber.Ctx) error {
	req := &domain.TestCase{}
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if req.ID != "" {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.TestCaseRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteTestCaseUsingDELETE(c *fiber.Ctx) error {
	if err := instances.TestCaseRepo.DeleteById(c.Params("id")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllTestCasesUsingGET(c *fiber.Ctx) error {
	entities, err := instances.TestCaseRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(entities)
}

func GetTestCaseUsingGET(c *fiber.Ctx) error {
	entity, err := instances.TestCaseRepo.FindById(c.Params("id"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateTestCaseUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func UpdateTestCaseUsingPUT(c *fiber.Ctx) error {
	req := &domain.TestCase{}
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if req.ID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "exists entity should have an ID")
	}
	if err := instances.TestCaseRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}
