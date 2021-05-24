package repositories

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/domain"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/google/uuid"
	"github.com/tidwall/buntdb"
)

const TEST_SETUP_PREFIX = "TEST_SETUP:"

type TestSetupRepository struct {
}

func NewTestSetupRepository() interfaces.TestSetupCrudRepository {

	app.BuntDB.CreateIndex(TEST_SETUP_PREFIX, TEST_SETUP_PREFIX+"*", buntdb.IndexString)

	return &TestSetupRepository{}
}

// Returns the number of entities available.
func (r *TestSetupRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_SETUP_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *TestSetupRepository) Delete(entity *domain.TestSetup) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(TEST_SETUP_PREFIX + entity.ID)
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *TestSetupRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_SETUP_PREFIX, func(key, value string) bool {
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
func (r *TestSetupRepository) DeleteAllEntities(entities []*domain.TestSetup) error {
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
func (r *TestSetupRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(TEST_SETUP_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *TestSetupRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(TEST_SETUP_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *TestSetupRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(TEST_SETUP_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *TestSetupRepository) FindAll() ([]*domain.TestSetup, error) {
	entities := make([]*domain.TestSetup, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_SETUP_PREFIX, func(key, value string) bool {
			entity := &domain.TestSetup{}
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *TestSetupRepository) FindAllById(ids []string) ([]*domain.TestSetup, error) {
	entities := make([]*domain.TestSetup, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(TEST_SETUP_PREFIX + id)
			if err != nil {
				continue
			}
			entity := &domain.TestSetup{}
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *TestSetupRepository) FindById(ID string) (*domain.TestSetup, error) {
	entity := &domain.TestSetup{}
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(TEST_SETUP_PREFIX + ID)
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
func (r *TestSetupRepository) Save(entity *domain.TestSetup) error {
	if entity.ID == "" {
		entity.ID = uuid.NewString()
	}
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(TEST_SETUP_PREFIX+entity.ID, string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *TestSetupRepository) SaveAll(entities []*domain.TestSetup) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			if entity.ID == "" {
				entity.ID = uuid.NewString()
			}
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(TEST_SETUP_PREFIX+entity.ID, string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
