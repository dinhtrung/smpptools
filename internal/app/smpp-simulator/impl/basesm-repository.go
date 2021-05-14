package impl

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/google/uuid"
	"github.com/tidwall/buntdb"
)

const BASE_SM_PREFIX = "baseSM"

type BaseSmRepository struct {
}

func NewBaseSmRepository() interfaces.BaseSmCrudRepository {
	app.BuntDB.CreateIndex(BASE_SM_PREFIX, BASE_SM_PREFIX+"*", buntdb.IndexString)

	return &BaseSmRepository{}
}

// Returns the number of entities available.
func (r *BaseSmRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(BASE_SM_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *BaseSmRepository) Delete(entity *openapi.BaseSm) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(BASE_SM_PREFIX + entity.GetId())
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *BaseSmRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(BASE_SM_PREFIX, func(key, value string) bool {
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
func (r *BaseSmRepository) DeleteAllEntities(entities []*openapi.BaseSm) error {
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
func (r *BaseSmRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(BASE_SM_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *BaseSmRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(BASE_SM_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *BaseSmRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(BASE_SM_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *BaseSmRepository) FindAll() ([]*openapi.BaseSm, error) {
	entities := make([]*openapi.BaseSm, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(BASE_SM_PREFIX, func(key, value string) bool {
			entity := openapi.NewBaseSmWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *BaseSmRepository) FindAllById(ids []string) ([]*openapi.BaseSm, error) {
	entities := make([]*openapi.BaseSm, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(BASE_SM_PREFIX + id)
			if err != nil {
				continue
			}
			entity := openapi.NewBaseSmWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *BaseSmRepository) FindById(ID string) (*openapi.BaseSm, error) {
	entity := openapi.NewBaseSmWithDefaults()
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(BASE_SM_PREFIX + ID)
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
func (r *BaseSmRepository) Save(entity *openapi.BaseSm) error {
	if _, ok := entity.GetIdOk(); !ok {
		entity.SetId(uuid.NewString())
	}
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(BASE_SM_PREFIX+entity.GetId(), string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *BaseSmRepository) SaveAll(entities []*openapi.BaseSm) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(BASE_SM_PREFIX+entity.GetId(), string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
