package impl

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/google/uuid"
	"github.com/tidwall/buntdb"
)

const ESME_SESSION_PREFIX = "ESME:SESSION:"

type EsmeSessionRepository struct {
}

func NewEsmeSessionRepository() interfaces.EsmeSessionCrudRepository {
	app.BuntDBInMemory.CreateIndex(ESME_SESSION_PREFIX, ESME_SESSION_PREFIX+"*", buntdb.IndexString)

	return &EsmeSessionRepository{}
}

// Returns the number of entities available.
func (r *EsmeSessionRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ESME_SESSION_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *EsmeSessionRepository) Delete(entity *openapi.EsmeSession) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(ESME_SESSION_PREFIX + entity.GetId())
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *EsmeSessionRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ESME_SESSION_PREFIX, func(key, value string) bool {
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
func (r *EsmeSessionRepository) DeleteAllEntities(entities []*openapi.EsmeSession) error {
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
func (r *EsmeSessionRepository) DeleteAllById(ids []string) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(ESME_SESSION_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *EsmeSessionRepository) DeleteById(ID string) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(ESME_SESSION_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *EsmeSessionRepository) ExistsById(ID string) bool {
	return app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(ESME_SESSION_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *EsmeSessionRepository) FindAll() ([]*openapi.EsmeSession, error) {
	entities := make([]*openapi.EsmeSession, 0)
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ESME_SESSION_PREFIX, func(key, value string) bool {
			entity := openapi.NewEsmeSessionWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *EsmeSessionRepository) FindAllById(ids []string) ([]*openapi.EsmeSession, error) {
	entities := make([]*openapi.EsmeSession, 0)
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(ESME_SESSION_PREFIX + id)
			if err != nil {
				continue
			}
			entity := openapi.NewEsmeSessionWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

func (r *EsmeSessionRepository) FindAllByAccountID(accountID string) ([]*openapi.EsmeSession, error) {
	entities := make([]*openapi.EsmeSession, 0)
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(ESME_SESSION_PREFIX, func(key, value string) bool {
			entity := openapi.NewEsmeSessionWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				if account, ok := entity.GetAccountOk(); ok {
					if account.GetId() == accountID {
						entities = append(entities, entity)
					}
				}
			}
			return true
		})
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *EsmeSessionRepository) FindById(ID string) (*openapi.EsmeSession, error) {
	entity := openapi.NewEsmeSessionWithDefaults()
	err := app.BuntDBInMemory.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(ESME_SESSION_PREFIX + ID)
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
func (r *EsmeSessionRepository) Save(entity *openapi.EsmeSession) error {
	if _, ok := entity.GetIdOk(); !ok {
		entity.SetId(uuid.NewString())
	}
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(ESME_SESSION_PREFIX+entity.GetId(), string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *EsmeSessionRepository) SaveAll(entities []*openapi.EsmeSession) error {
	return app.BuntDBInMemory.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			if _, ok := entity.GetIdOk(); !ok {
				entity.SetId(uuid.NewString())
			}
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(ESME_SESSION_PREFIX+entity.GetId(), string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
