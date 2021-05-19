package impl

import (
	"encoding/json"
	"log"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/google/uuid"
	"github.com/tidwall/buntdb"
)

const SMSC_SESSION_PREFIX = "SMSC:SESSION:"

type SmscSessionRepository struct {
}

func NewSmscSessionRepository() interfaces.SmscSessionCrudRepository {
	app.BuntDBInMemory.CreateIndex(SMSC_SESSION_PREFIX, SMSC_SESSION_PREFIX+"*", buntdb.IndexString)

	return &SmscSessionRepository{}
}

// Returns the number of entities available.
func (r *SmscSessionRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_SESSION_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *SmscSessionRepository) Delete(entity *openapi.SmscSession) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(SMSC_SESSION_PREFIX + entity.GetId())
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *SmscSessionRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_SESSION_PREFIX, func(key, value string) bool {
			ids = append(ids, key)
			return true
		})
	})
	if err != nil {
		return err
	}
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
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
func (r *SmscSessionRepository) DeleteAllEntities(entities []*openapi.SmscSession) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
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
func (r *SmscSessionRepository) DeleteAllById(ids []string) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(SMSC_SESSION_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *SmscSessionRepository) DeleteById(ID string) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(SMSC_SESSION_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *SmscSessionRepository) ExistsById(ID string) bool {
	return app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(SMSC_SESSION_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *SmscSessionRepository) FindAll() ([]*openapi.SmscSession, error) {
	entities := make([]*openapi.SmscSession, 0)
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_SESSION_PREFIX, func(key, value string) bool {
			entity := openapi.NewSmscSessionWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *SmscSessionRepository) FindAllById(ids []string) ([]*openapi.SmscSession, error) {
	entities := make([]*openapi.SmscSession, 0)
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(SMSC_SESSION_PREFIX + id)
			if err != nil {
				continue
			}
			entity := openapi.NewSmscSessionWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

func (r *SmscSessionRepository) FindAllByInstance(instanceID string) ([]*openapi.SmscSession, error) {
	entities := make([]*openapi.SmscSession, 0)
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(SMSC_SESSION_PREFIX, func(key, value string) bool {
			entity := openapi.NewSmscSessionWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *SmscSessionRepository) FindById(ID string) (*openapi.SmscSession, error) {
	entity := openapi.NewSmscSessionWithDefaults()
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(SMSC_SESSION_PREFIX + ID)
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
func (r *SmscSessionRepository) Save(entity *openapi.SmscSession) error {
	if _, ok := entity.GetIdOk(); !ok {
		entity.SetId(uuid.NewString())
	}
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		log.Printf("saving session: %s | %s", entity.GetId(), string(entityJson))
		_, _, err = tx.Set(SMSC_SESSION_PREFIX+entity.GetId(), string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *SmscSessionRepository) SaveAll(entities []*openapi.SmscSession) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(SMSC_SESSION_PREFIX+entity.GetId(), string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
