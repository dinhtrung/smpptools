package api

import (
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func CreateThroughputSeriesUsingPOST(c *fiber.Ctx) error {
	req := openapi.NewThroughputSeriesWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetNameOk(); ok {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an Name")
	}
	if err := instances.ThroughputSeriesRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteThroughputSeriesUsingDELETE(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func GetAllThroughputSeriessUsingGET(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func GetThroughputSeriesUsingGET(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func GetVariantThroughputSeriesUsingGET(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func PartialUpdateThroughputSeriesUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func UpdateThroughputSeriesUsingPUT(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
