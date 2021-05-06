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

// GetAllSmppConnectionProfile return all items
func GetAllSmppConnectionProfile(c *fiber.Ctx) error {
	rows := make([]domain.EsmeConnection, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		er := tx.Ascend("", func(key, value string) bool {
			if !strings.HasPrefix(key, domain.ESME) {
				return false
			}
			var row domain.EsmeConnection
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

// GetSmppConnectionProfile return a single item with given ID
func GetSmppConnectionProfile(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return fiber.ErrBadRequest
	}

	var item domain.EsmeConnection
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		val, err := tx.Get(fmt.Sprintf("R%s", id))
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

// NewSmppConnectionProfile create a new domain.EsmeConnection
func NewSmppConnectionProfile(c *fiber.Ctx) error {
	item := domain.EsmeConnection{}
	if err := c.BodyParser(&item.Info); err != nil {
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

// DeleteSmppConnectionProfile delete the item with given ID
func DeleteSmppConnectionProfile(c *fiber.Ctx) error {
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

// DeleteSmppConnectionProfile delete the item with given ID
func DeleteAllSmppConnectionProfile(c *fiber.Ctx) error {
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

// ImportJSONSmppConnectionProfile import data on JSON array format into DB
func ImportJSONSmppConnectionProfile(c *fiber.Ctx) error {
	var items []dto.SmppConnectionProfile
	if err := c.BodyParser(&items); err != nil {
		return err
	}
	var okItems []domain.EsmeConnection
	err := app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, item := range items {
			profile := domain.EsmeConnection{Info: item}
			key := profile.Key()
			jsondata, err := json.Marshal(profile)
			if err != nil {
				log.Printf("Unable to serialize value: +%v | %s", item, err)
				continue
			}
			_, _, err = tx.Set(key, string(jsondata), nil)
			okItems = append(okItems, profile)
			return err
		}
		return nil
	})
	if err != nil {
		return err
	}

	return c.JSON(okItems)
}
