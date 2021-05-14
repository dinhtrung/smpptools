package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func CreateIsdnListUsingPOST(c *fiber.Ctx) error {
	req := openapi.NewIsdnListWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); ok {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.IsdnListRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteIsdnListUsingDELETE(c *fiber.Ctx) error {
	if err := instances.IsdnListRepo.DeleteById(c.Params("id")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllIsdnListsUsingGET(c *fiber.Ctx) error {
	entities, err := instances.IsdnListRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(entities)
}

func GetIsdnListUsingGET(c *fiber.Ctx) error {
	entity, err := instances.IsdnListRepo.FindById(c.Params("id"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateIsdnListUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func UpdateIsdnListUsingPUT(c *fiber.Ctx) error {
	req := openapi.NewIsdnListWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); !ok {
		return fiber.NewError(fiber.StatusBadRequest, "exists entity should have an ID")
	}
	if err := instances.IsdnListRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}
