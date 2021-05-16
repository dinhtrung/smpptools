package impl

import (
	"encoding/json"
	"fmt"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/tidwall/buntdb"
)

const SMSC_INSTANCE_PREFIX = "SMSC:INSTANCE:"

type SmscInstanceRepository struct {
}

func NewSmscInstanceRepository() interfaces.SmscInstanceCrudRepository {
	app.BuntDB.CreateIndex(SMSC_INSTANCE_PREFIX, SMSC_INSTANCE_PREFIX+"*", buntdb.IndexString)

	return &SmscInstanceRepository{}
}

// Returns the number of entities available.
func (r *SmscInstanceRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_INSTANCE_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *SmscInstanceRepository) Delete(entity *openapi.SmscInstance) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(SMSC_INSTANCE_PREFIX + entity.GetId())
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *SmscInstanceRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_INSTANCE_PREFIX, func(key, value string) bool {
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
func (r *SmscInstanceRepository) DeleteAllEntities(entities []*openapi.SmscInstance) error {
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
func (r *SmscInstanceRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(SMSC_INSTANCE_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *SmscInstanceRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(SMSC_INSTANCE_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *SmscInstanceRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(SMSC_INSTANCE_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *SmscInstanceRepository) FindAll() ([]*openapi.SmscInstance, error) {
	entities := make([]*openapi.SmscInstance, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_INSTANCE_PREFIX, func(key, value string) bool {
			entity := openapi.NewSmscInstanceWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *SmscInstanceRepository) FindAllById(ids []string) ([]*openapi.SmscInstance, error) {
	entities := make([]*openapi.SmscInstance, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(SMSC_INSTANCE_PREFIX + id)
			if err != nil {
				continue
			}
			entity := openapi.NewSmscInstanceWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *SmscInstanceRepository) FindById(ID string) (*openapi.SmscInstance, error) {
	entity := openapi.NewSmscInstanceWithDefaults()
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(SMSC_INSTANCE_PREFIX + ID)
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
func (r *SmscInstanceRepository) Save(entity *openapi.SmscInstance) error {
	entity.SetId(fmt.Sprint(entity.GetPort()))
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(SMSC_INSTANCE_PREFIX+entity.GetId(), string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *SmscInstanceRepository) SaveAll(entities []*openapi.SmscInstance) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			entity.SetId(fmt.Sprint(entity.GetPort()))
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(SMSC_INSTANCE_PREFIX+entity.GetId(), string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
