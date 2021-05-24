package repositories

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/domain"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/tidwall/buntdb"
)

const TEST_CASE_PREFIX = "THROUGHPUT:SERIES:"

type TestCaseRepository struct {
}

func NewTestCaseRepository() interfaces.TestCaseCrudRepository {
	app.BuntDB.CreateIndex(TEST_CASE_PREFIX, TEST_CASE_PREFIX+"*", buntdb.IndexString)

	return &TestCaseRepository{}
}

// Returns the number of entities available.
func (r *TestCaseRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_CASE_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *TestCaseRepository) Delete(entity *domain.TestCase) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(TEST_CASE_PREFIX + entity.Name)
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *TestCaseRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_CASE_PREFIX, func(key, value string) bool {
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
func (r *TestCaseRepository) DeleteAllEntities(entities []*domain.TestCase) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			_, err := tx.Delete(entity.Name)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes all instances of the type T with the given IDs.
func (r *TestCaseRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(TEST_CASE_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *TestCaseRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(TEST_CASE_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *TestCaseRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(TEST_CASE_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *TestCaseRepository) FindAll() ([]*domain.TestCase, error) {
	entities := make([]*domain.TestCase, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(TEST_CASE_PREFIX, func(key, value string) bool {
			entity := &domain.TestCase{}
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *TestCaseRepository) FindAllById(ids []string) ([]*domain.TestCase, error) {
	entities := make([]*domain.TestCase, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(TEST_CASE_PREFIX + id)
			if err != nil {
				continue
			}
			entity := &domain.TestCase{}
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *TestCaseRepository) FindById(ID string) (*domain.TestCase, error) {
	entity := &domain.TestCase{}
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(TEST_CASE_PREFIX + ID)
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
func (r *TestCaseRepository) Save(entity *domain.TestCase) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(TEST_CASE_PREFIX+entity.Name, string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *TestCaseRepository) SaveAll(entities []*domain.TestCase) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(TEST_CASE_PREFIX+entity.Name, string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
