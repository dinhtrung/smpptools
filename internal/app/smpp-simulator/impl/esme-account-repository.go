package impl

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/google/uuid"
	"github.com/tidwall/buntdb"
)

const ESME_ACCOUNT_PREFIX = "ESME:ACCOUNT:"

type EsmeAccountRepository struct {
}

func NewEsmeAccountRepository() interfaces.EsmeAccountCrudRepository {
	app.BuntDB.CreateIndex(ESME_ACCOUNT_PREFIX, ESME_ACCOUNT_PREFIX+"*", buntdb.IndexString)

	return &EsmeAccountRepository{}
}

// Returns the number of entities available.
func (r *EsmeAccountRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ESME_ACCOUNT_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *EsmeAccountRepository) Delete(entity *openapi.EsmeAccount) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(ESME_ACCOUNT_PREFIX + entity.GetId())
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *EsmeAccountRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ESME_ACCOUNT_PREFIX, func(key, value string) bool {
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
func (r *EsmeAccountRepository) DeleteAllEntities(entities []*openapi.EsmeAccount) error {
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
func (r *EsmeAccountRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(ESME_ACCOUNT_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *EsmeAccountRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(ESME_ACCOUNT_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *EsmeAccountRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(ESME_ACCOUNT_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *EsmeAccountRepository) FindAll() ([]*openapi.EsmeAccount, error) {
	entities := make([]*openapi.EsmeAccount, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ESME_ACCOUNT_PREFIX, func(key, value string) bool {
			entity := openapi.NewEsmeAccountWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *EsmeAccountRepository) FindAllById(ids []string) ([]*openapi.EsmeAccount, error) {
	entities := make([]*openapi.EsmeAccount, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(ESME_ACCOUNT_PREFIX + id)
			if err != nil {
				continue
			}
			entity := openapi.NewEsmeAccountWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *EsmeAccountRepository) FindById(ID string) (*openapi.EsmeAccount, error) {
	entity := openapi.NewEsmeAccountWithDefaults()
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(ESME_ACCOUNT_PREFIX + ID)
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
func (r *EsmeAccountRepository) Save(entity *openapi.EsmeAccount) error {
	if _, ok := entity.GetIdOk(); !ok {
		entity.SetId(uuid.NewString())
	}
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(ESME_ACCOUNT_PREFIX+entity.GetId(), string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *EsmeAccountRepository) SaveAll(entities []*openapi.EsmeAccount) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(ESME_ACCOUNT_PREFIX+entity.GetId(), string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
