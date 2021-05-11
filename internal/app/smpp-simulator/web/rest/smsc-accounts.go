package rest

import (
	"encoding/json"
	"fmt"
	"log"
	"strings"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/domain"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/services/dto"
	"github.com/gofiber/fiber/v2"
	"github.com/tidwall/buntdb"
)

// GetAllSMSCAccount return all items
func GetAllSMSCAccount(c *fiber.Ctx) error {
	rows := make([]dto.SMSCAccount, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		er := tx.Ascend("", func(key, value string) bool {
			if !strings.HasPrefix(key, domain.ESME) {
				return false
			}
			var row dto.SMSCAccount
			if err := json.Unmarshal([]byte(value), &row); err == nil {
				rows = append(rows, row)
			}
			return true
		})
		return er
	})
	if err != nil {
		return err
	}
	return c.JSON(rows)
}

// GetSMSCAccount return a single item with given ID
func GetSMSCAccount(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return fiber.ErrBadRequest
	}

	var item dto.SMSCAccount
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		val, err := tx.Get(id)
		if err != nil {
			return err
		}
		fmt.Printf("value is %s\n", val)
		if err := json.Unmarshal([]byte(val), &item); err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return err
	}
	return c.JSON(item)
}

// NewSMSCAccount create a new domain.SMSCAccount
func NewSMSCAccount(c *fiber.Ctx) error {
	item := dto.SMSCAccount{}
	if err := c.BodyParser(&item); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	err := app.BuntDB.Update(func(tx *buntdb.Tx) error {
		key := item.Connection.Addr
		jsondata, err := json.Marshal(item)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(key, string(jsondata), nil)
		return err
	})
	if err != nil {
		return err
	}

	return c.JSON(item)
}

// DeleteSMSCAccount delete the item with given ID
func DeleteSMSCAccount(c *fiber.Ctx) error {
	id := c.Params("id")

	err := app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(id)
		return err
	})
	if err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

// DeleteSMSCAccount delete the item with given ID
func DeleteAllSMSCAccount(c *fiber.Ctx) error {
	delkeys := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend("", func(key, value string) bool {
			if strings.HasPrefix(key, domain.ESME) {
				delkeys = append(delkeys, key)
			}
			return true
		})
	})
	if err != nil {
		return err
	}

	delErr := app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, k := range delkeys {
			if _, err = tx.Delete(k); err != nil {
				return err
			}
		}
		return nil
	})
	if delErr != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

// ImportJSONSMSCAccount import data on JSON array format into DB
func ImportJSONSMSCAccount(c *fiber.Ctx) error {
	var items []dto.SMSCAccount
	if err := c.BodyParser(&items); err != nil {
		return err
	}
	var okItems []dto.SMSCAccount
	err := app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, item := range items {
			key := item.Connection.Addr
			jsondata, err := json.Marshal(item)
			if err != nil {
				log.Printf("Unable to serialize value: +%v | %s", item, err)
				continue
			}
			_, _, err = tx.Set(key, string(jsondata), nil)
			okItems = append(okItems, item)
			return err
		}
		return nil
	})
	if err != nil {
		return err
	}

	return c.JSON(okItems)
}
