package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func CreateBaseSmUsingPOST(c *fiber.Ctx) error {
	req := openapi.NewBaseSmWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); ok {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.BaseSmRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteBaseSmUsingDELETE(c *fiber.Ctx) error {
	if err := instances.BaseSmRepo.DeleteById(c.Params("id")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllBaseSmsUsingGET(c *fiber.Ctx) error {
	entities, err := instances.BaseSmRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(entities)
}

func GetBaseSmUsingGET(c *fiber.Ctx) error {
	entity, err := instances.BaseSmRepo.FindById(c.Params("id"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateBaseSmUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func UpdateBaseSmUsingPUT(c *fiber.Ctx) error {
	req := openapi.NewBaseSmWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); !ok {
		return fiber.NewError(fiber.StatusBadRequest, "exists entity should have an ID")
	}
	if err := instances.BaseSmRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}
