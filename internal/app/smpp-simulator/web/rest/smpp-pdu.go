package rest

import (
	"encoding/json"
	"log"
	"strings"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/app/smpp-simulator/domain"
	"github.com/gofiber/fiber/v2"
	"github.com/tidwall/buntdb"
)

// GetAllPDU return all items
func GetAllPDU(c *fiber.Ctx) error {
	rows := make([]domain.BaseSM, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		er := tx.Ascend("", func(key, value string) bool {
			if !strings.HasPrefix(key, domain.PDU) {
				return false
			}
			var row domain.BaseSM
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

// GetPDU return a single item with given ID
func GetPDU(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return fiber.ErrBadRequest
	}

	var item domain.BaseSM
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		val, err := tx.Get(domain.PDU + ":" + id)
		if err != nil {
			return err
		}
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

// NewPDU create a new domain.BaseSM
func NewPDU(c *fiber.Ctx) error {
	item := domain.BaseSM{}
	if err := c.BodyParser(&item.SM); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	err := app.BuntDB.Update(func(tx *buntdb.Tx) error {
		key := item.Key()
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

// DeletePDU delete the item with given ID
func DeletePDU(c *fiber.Ctx) error {
	id := c.Params("id")

	err := app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(domain.PDU + ":" + id)
		return err
	})
	if err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

// DeletePDU delete the item with given ID
func DeleteAllPDU(c *fiber.Ctx) error {
	delkeys := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend("", func(key, value string) bool {
			if strings.HasPrefix(key, domain.PDU) {
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

// ImportJSONPDU import data on JSON array format into DB
func ImportJSONPDU(c *fiber.Ctx) error {
	var items []domain.BaseSM
	if err := c.BodyParser(&items); err != nil {
		return err
	}
	var okItems []domain.BaseSM
	err := app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, item := range items {
			jsondata, err := json.Marshal(item)
			if err != nil {
				log.Printf("Unable to serialize value: +%v | %s", item, err)
				continue
			}
			_, _, err = tx.Set(item.Key(), string(jsondata), nil)
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
