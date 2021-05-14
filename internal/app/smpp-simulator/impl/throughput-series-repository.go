package impl

import (
	"encoding/json"

	"github.com/dinhtrung/smpptools/internal/app"
	"github.com/dinhtrung/smpptools/internal/pkg/interfaces"
	"github.com/dinhtrung/smpptools/pkg/smpptools/openapi"
	"github.com/google/uuid"
	"github.com/tidwall/buntdb"
)

const THROUGHPUT_SERIES_PREFIX = "THROUGHPUT:SERIES:"

type ThroughputSeriesRepository struct {
}

func NewThroughputSeriesRepository() interfaces.ThroughputSeriesCrudRepository {
	app.BuntDB.CreateIndex(THROUGHPUT_SERIES_PREFIX, THROUGHPUT_SERIES_PREFIX+"*", buntdb.IndexString)

	return &ThroughputSeriesRepository{}
}

// Returns the number of entities available.
func (r *ThroughputSeriesRepository) Count() (int, error) {
	cnt := 0
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(THROUGHPUT_SERIES_PREFIX, func(key, value string) bool {
			cnt++
			return true
		})
	})
	return cnt, err
}

// Deletes a given entity.
func (r *ThroughputSeriesRepository) Delete(entity *openapi.ThroughputSeries) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(THROUGHPUT_SERIES_PREFIX + entity.GetName())
		if err != nil {
			return err
		}
		return nil
	})
}

// Deletes all entities managed by the repository.
func (r *ThroughputSeriesRepository) DeleteAll() error {
	ids := make([]string, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(THROUGHPUT_SERIES_PREFIX, func(key, value string) bool {
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
func (r *ThroughputSeriesRepository) DeleteAllEntities(entities []*openapi.ThroughputSeries) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			_, err := tx.Delete(entity.GetName())
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes all instances of the type T with the given IDs.
func (r *ThroughputSeriesRepository) DeleteAllById(ids []string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			_, err := tx.Delete(THROUGHPUT_SERIES_PREFIX + id)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

// Deletes the entity with the given id.
func (r *ThroughputSeriesRepository) DeleteById(ID string) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		_, err := tx.Delete(THROUGHPUT_SERIES_PREFIX + ID)
		return err
	})
}

// Returns whether an entity with the given id exists.
func (r *ThroughputSeriesRepository) ExistsById(ID string) bool {
	return app.BuntDB.View(func(tx *buntdb.Tx) error {
		_, err := tx.Get(THROUGHPUT_SERIES_PREFIX + ID)
		return err
	}) == nil
}

// Returns all instances of the type.
func (r *ThroughputSeriesRepository) FindAll() ([]*openapi.ThroughputSeries, error) {
	entities := make([]*openapi.ThroughputSeries, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		return tx.Ascend(THROUGHPUT_SERIES_PREFIX, func(key, value string) bool {
			entity := openapi.NewThroughputSeriesWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
			return true
		})
	})
	return entities, err
}

// Returns all instances of the type T with the given IDs.
func (r *ThroughputSeriesRepository) FindAllById(ids []string) ([]*openapi.ThroughputSeries, error) {
	entities := make([]*openapi.ThroughputSeries, 0)
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		for _, id := range ids {
			value, err := tx.Get(THROUGHPUT_SERIES_PREFIX + id)
			if err != nil {
				continue
			}
			entity := openapi.NewThroughputSeriesWithDefaults()
			if err := json.Unmarshal([]byte(value), entity); err == nil {
				entities = append(entities, entity)
			}
		}
		return nil
	})
	return entities, err
}

// Retrieves an entity by its id.
func (r *ThroughputSeriesRepository) FindById(ID string) (*openapi.ThroughputSeries, error) {
	entity := openapi.NewThroughputSeriesWithDefaults()
	err := app.BuntDB.View(func(tx *buntdb.Tx) error {
		value, err := tx.Get(THROUGHPUT_SERIES_PREFIX + ID)
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
func (r *ThroughputSeriesRepository) Save(entity *openapi.ThroughputSeries) error {
	if _, ok := entity.GetNameOk(); !ok {
		entity.SetName(uuid.NewString())
	}
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		entityJson, err := json.Marshal(entity)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(THROUGHPUT_SERIES_PREFIX+entity.GetName(), string(entityJson), nil)
		return err
	})
}

// Saves all given entities.
func (r *ThroughputSeriesRepository) SaveAll(entities []*openapi.ThroughputSeries) error {
	return app.BuntDB.Update(func(tx *buntdb.Tx) error {
		for _, entity := range entities {
			entityJson, err := json.Marshal(entity)
			if err != nil {
				return err
			}
			_, _, err = tx.Set(THROUGHPUT_SERIES_PREFIX+entity.GetName(), string(entityJson), nil)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
