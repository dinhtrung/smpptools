package api

import (
	"context"
	"log"

	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services/dto"
	"github.com/gofiber/fiber/v2"
)

// StartSession start the current sessions from binding configuration
func StartSmscInstance(c *fiber.Ctx) error {
	var info dto.SmscInstance
	if err := c.BodyParser(&info); err != nil {
		return err
	}
	ctx, cancel := context.WithCancel(context.Background())
	if err := info.StartInstance(ctx); err != nil {
		defer cancel()
		return err
	}
	return c.Status(fiber.StatusAccepted).JSON(info)
}

// StopSession stop the current sessions
func StopSmscInstance(c *fiber.Ctx) error {
	sid := c.Params("instanceID")
	log.Printf("stopping instance ID: %s", sid)
	if instance, ok := services.SMSC_INSTANCES[sid]; ok {
		if instance == nil {
			delete(services.SMSC_INSTANCES, sid)
			return fiber.NewError(fiber.StatusNotFound, "invalid session ID")

		}
		if err := instance.Close(); err != nil {
			return err
		}
		return fiber.NewError(fiber.StatusAccepted, "successfully close instance")
	}
	return fiber.NewError(fiber.StatusNotFound, "invalid session ID")
}

// StopSession stop the current sessions
func StopAllSmscInstances(c *fiber.Ctx) error {
	for k, v := range services.SMSC_INSTANCES {
		log.Printf("stopping session: %s", k)
		if err := v.Close(); err != nil {
			return err
		}
		delete(services.SMSC_INSTANCES, k)
	}
	return c.SendStatus(fiber.StatusAccepted)
}

// GetSessions return list of available sessions
func GetAllSmscInstances(c *fiber.Ctx) error {
	resp := make(map[string]string)
	for k, v := range services.SMSC_INSTANCES {
		resp[k] = v.SessionConf.SystemID
	}
	return c.JSON(resp)
}

// GetSessions return list of available sessions
func GetSmscInstances(c *fiber.Ctx) error {
	sid := c.Params("instanceID")
	if instance, ok := services.SMSC_INSTANCES[sid]; ok {
		return c.JSON(instance)
	}
	return fiber.NewError(fiber.StatusBadRequest, "invalid instance id")
}
