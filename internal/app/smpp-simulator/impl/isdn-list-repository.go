package impl

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/google/uuid"
	"github.com/tidwall/buntdb"
)

const ISDNLIST_PREFIX = "ISDNLIST:"

type IsdnListRepository struct {
}

func NewIsdnListRepository() interfaces.IsdnListCrudRepository {
	app.BuntDB.CreateIndex(ISDNLIST_PREFIX, ISDNLIST_PREFIX+"*", buntdb.IndexString)

	return &IsdnListRepository{}
}

// Returns the number of entities available.
func (r *IsdnListRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ISDNLIST_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *IsdnListRepository) Delete(entity *openapi.IsdnList) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(ISDNLIST_PREFIX + entity.GetId())
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *IsdnListRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ISDNLIST_PREFIX, func(key, value string) bool {
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
func (r *IsdnListRepository) DeleteAllEntities(entities []*openapi.IsdnList) error {
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
func (r *IsdnListRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(ISDNLIST_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *IsdnListRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(ISDNLIST_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *IsdnListRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(ISDNLIST_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *IsdnListRepository) FindAll() ([]*openapi.IsdnList, error) {
	entities := make([]*openapi.IsdnList, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ISDNLIST_PREFIX, func(key, value string) bool {
			entity := openapi.NewIsdnListWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *IsdnListRepository) FindAllById(ids []string) ([]*openapi.IsdnList, error) {
	entities := make([]*openapi.IsdnList, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(ISDNLIST_PREFIX + id)
			if err != nil {
				continue
			}
			entity := openapi.NewIsdnListWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *IsdnListRepository) FindById(ID string) (*openapi.IsdnList, error) {
	entity := openapi.NewIsdnListWithDefaults()
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(ISDNLIST_PREFIX + ID)
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
func (r *IsdnListRepository) Save(entity *openapi.IsdnList) error {
	if _, ok := entity.GetIdOk(); !ok {
		entity.SetId(uuid.NewString())
	}
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(ISDNLIST_PREFIX+entity.GetId(), string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *IsdnListRepository) SaveAll(entities []*openapi.IsdnList) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(ISDNLIST_PREFIX+entity.GetId(), string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
