package impl

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/tidwall/buntdb"
)

const SMSC_ACCOUNT_PREFIX = "SMSC:ACCOUNT"

type SmscAccountRepository struct {
}

func NewSmscAccountRepository() interfaces.SmscAccountCrudRepository {
	app.BuntDB.CreateIndex(SMSC_ACCOUNT_PREFIX, SMSC_ACCOUNT_PREFIX+"*", buntdb.IndexString)

	return &SmscAccountRepository{}
}

// Returns the number of entities available.
func (r *SmscAccountRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_ACCOUNT_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *SmscAccountRepository) Delete(entity *openapi.SmscAccount) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(SMSC_ACCOUNT_PREFIX + entity.GetId())
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *SmscAccountRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_ACCOUNT_PREFIX, func(key, value string) bool {
			ids = append(ids, key)
			return true
		})
	})
	if err != nil {
		return err
	}
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the given entities.
func (r *SmscAccountRepository) DeleteAllEntities(entities []*openapi.SmscAccount) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			_, err := tx.Delete(entity.GetId())
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes all instances of the type T with the given IDs.
func (r *SmscAccountRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(SMSC_ACCOUNT_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *SmscAccountRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(SMSC_ACCOUNT_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *SmscAccountRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(SMSC_ACCOUNT_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *SmscAccountRepository) FindAll() ([]*openapi.SmscAccount, error) {
	entities := make([]*openapi.SmscAccount, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_ACCOUNT_PREFIX, func(key, value string) bool {
			entity := openapi.NewSmscAccountWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *SmscAccountRepository) FindAllById(ids []string) ([]*openapi.SmscAccount, error) {
	entities := make([]*openapi.SmscAccount, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(SMSC_ACCOUNT_PREFIX + id)
			if err != nil {
				continue
			}
			entity := openapi.NewSmscAccountWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *SmscAccountRepository) FindById(ID string) (*openapi.SmscAccount, error) {
	entity := openapi.NewSmscAccountWithDefaults()
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(SMSC_ACCOUNT_PREFIX + ID)
		if err != nil {
			return err
		}
		if err := json.Unmarshal([]byte(value), entity); err != nil {
			return err
		}
		return nil
	})
	return entity, err
}

// Saves a given entity.
func (r *SmscAccountRepository) Save(entity *openapi.SmscAccount) error {
	entity.SetId(entity.GetSystemID())
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(SMSC_ACCOUNT_PREFIX+entity.GetId(), string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *SmscAccountRepository) SaveAll(entities []*openapi.SmscAccount) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			entity.SetId(entity.GetSystemID())
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(SMSC_ACCOUNT_PREFIX+entity.GetId(), string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
