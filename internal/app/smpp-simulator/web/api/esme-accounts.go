package api

import (
	"context"

	"github.com/ajankovic/smpp/pdu"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/instances"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services/mappers"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/gofiber/fiber/v2"
)

func UpdateEsmeAccountUsingPUT(c *fiber.Ctx) error {
	req := openapi.NewEsmeAccountWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); !ok {
		return fiber.NewError(fiber.StatusBadRequest, "missing ID")
	}
	if err := instances.EsmeAccountRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func CreateEsmeAccountUsingPOST(c *fiber.Ctx) error {
	req := openapi.NewEsmeAccountWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if _, ok := req.GetIdOk(); ok {
		return fiber.NewError(fiber.StatusBadRequest, "new entity cannot have an ID")
	}
	if err := instances.EsmeAccountRepo.Save(req); err != nil {
		return err
	}
	return c.JSON(req)
}

func DeleteEsmeAccountUsingDELETE(c *fiber.Ctx) error {
	if err := instances.EsmeAccountRepo.DeleteById(c.Params("accountID")); err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllEsmeAccountsUsingGET(c *fiber.Ctx) error {
	entities, err := instances.EsmeAccountRepo.FindAll()
	if err != nil {
		return err
	}
	return c.JSON(entities)
}

func GetEsmeAccountUsingGET(c *fiber.Ctx) error {
	entity, err := instances.EsmeAccountRepo.FindById(c.Params("accountID"))
	if err != nil {
		return err
	}
	return c.JSON(entity)
}

func PartialUpdateEsmeAccountUsingPATCH(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func ApiEsmeAccountsIdBatchDelete(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func SendMobileTerminatedSMSOnAccountUsingPOST(c *fiber.Ctx) error {
	accountID := c.Params("accountID")
	if accountID == "" {
		return fiber.ErrBadRequest
	}

	entities, err := instances.EsmeSessionRepo.FindAllByAccountID(accountID)
	if err != nil {
		return err
	}
	if len(entities) == 0 {
		return fiber.ErrExpectationFailed
	}

	req := openapi.NewBaseSmWithDefaults()
	if err := c.BodyParser(req); err != nil {
		return err
	}

	pdus, err := mappers.ToSubmitSM(req)
	if err != nil {
		return err
	}
	res := make([]pdu.PDU, 0)
	for _, entity := range entities {
		sid := entity.GetId()
		if sess, ok := services.SMPP_CLIENT_SESSIONS[sid]; ok {
			for _, p := range pdus {
				if respdu, err := sess.Send(context.TODO(), p); err == nil {
					res = append(res, respdu)
				}
			}
		}
	}
	return c.JSON(res)
}

func SendSMSonSMSCsessionUsingPOST(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func StopAllEsmeSessionsForAccountUsingDELETE(c *fiber.Ctx) error {
	entities, err := instances.EsmeSessionRepo.FindAllByAccountID(c.Params("accountID"))
	if err != nil {
		return err
	}
	for _, entity := range entities {
		sid := entity.GetId()
		if sess, ok := services.SMPP_CLIENT_SESSIONS[sid]; ok {
			if err := sess.Close(); err != nil {
				return err
			}
			delete(services.SMPP_CLIENT_SESSIONS, sid)
			instances.EsmeSessionRepo.DeleteById(sid)
		}
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetAllEsmeSessionsByAccountUsingGET(c *fiber.Ctx) error {
	entities, err := instances.EsmeSessionRepo.FindAllByAccountID(c.Params("accountID"))
	if err != nil {
		return err
	}
	return c.JSON(entities)
}
