package interfaces

import "github.com/dinhtrung/smpptools/pkg/smpptools/openapi"

// CrudRepository provide basic information about a repository
type EsmeAccountCrudRepository interface {
	// Returns the number of entities available.
	Count() (int, error)

	// Deletes a given entity.
	Delete(entity *openapi.EsmeAccount) error

	// Deletes all entities managed by the repository.
	DeleteAll() error

	// Deletes the given entities.
	DeleteAllEntities(entities []*openapi.EsmeAccount) error

	// Deletes all instances of the type T with the given IDs.
	DeleteAllById(ids []string) error

	// Deletes the entity with the given id.
	DeleteById(ID string) error

	// Returns whether an entity with the given id exists.
	ExistsById(ID string) bool

	// Returns all instances of the type.
	FindAll() ([]*openapi.EsmeAccount, error)

	// Returns all instances of the type T with the given IDs.
	FindAllById(ids []string) ([]*openapi.EsmeAccount, error)

	// Retrieves an entity by its id.
	FindById(ID string) (*openapi.EsmeAccount, error)

	// Saves a given entity.
	Save(entity *openapi.EsmeAccount) error

	// Saves all given entities.
	SaveAll(entities []*openapi.EsmeAccount) error
}
