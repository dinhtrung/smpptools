package repositories

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/domain"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/google/uuid"
	"github.com/tidwall/buntdb"
)

const TEST_SESSION_PREFIX = "TEST_SESSION:"

type TestSessionRepository struct {
}

func NewTestSessionRepository() interfaces.TestSessionCrudRepository {
	app.BuntDB.CreateIndex(TEST_SESSION_PREFIX, TEST_SESSION_PREFIX+"*", buntdb.IndexString)

	return &TestSessionRepository{}
}

// Returns the number of entities available.
func (r *TestSessionRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_SESSION_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *TestSessionRepository) Delete(entity *domain.TestSession) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(TEST_SESSION_PREFIX + entity.ID)
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *TestSessionRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_SESSION_PREFIX, func(key, value string) bool {
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
func (r *TestSessionRepository) DeleteAllEntities(entities []*domain.TestSession) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			_, err := tx.Delete(entity.ID)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes all instances of the type T with the given IDs.
func (r *TestSessionRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(TEST_SESSION_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *TestSessionRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(TEST_SESSION_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *TestSessionRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(TEST_SESSION_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *TestSessionRepository) FindAll() ([]*domain.TestSession, error) {
	entities := make([]*domain.TestSession, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_SESSION_PREFIX, func(key, value string) bool {
			entity := &domain.TestSession{}
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *TestSessionRepository) FindAllById(ids []string) ([]*domain.TestSession, error) {
	entities := make([]*domain.TestSession, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(TEST_SESSION_PREFIX + id)
			if err != nil {
				continue
			}
			entity := &domain.TestSession{}
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *TestSessionRepository) FindById(ID string) (*domain.TestSession, error) {
	entity := &domain.TestSession{}
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(TEST_SESSION_PREFIX + ID)
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
func (r *TestSessionRepository) Save(entity *domain.TestSession) error {
	if entity.ID == "" {
		entity.ID = uuid.NewString()
	}
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(TEST_SESSION_PREFIX+entity.ID, string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *TestSessionRepository) SaveAll(entities []*domain.TestSession) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			if entity.ID == "" {
				entity.ID = uuid.NewString()
			}
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(TEST_SESSION_PREFIX+entity.ID, string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
