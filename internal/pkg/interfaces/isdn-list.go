package interfaces

import "github.com/dinhtrung/smpptools/pkg/smpptools/openapi"

// CrudRepository provide basic information about a repository
type IsdnListCrudRepository interface {
	// Returns the number of entities available.
	Count() (int, error)

	// Deletes a given entity.
	Delete(entity *openapi.IsdnList) error

	// Deletes all entities managed by the repository.
	DeleteAll() error

	// Deletes the given entities.
	DeleteAllEntities(entities []*openapi.IsdnList) error

	// Deletes all instances of the type T with the given IDs.
	DeleteAllById(ids []string) error

	// Deletes the entity with the given id.
	DeleteById(ID string) error

	// Returns whether an entity with the given id exists.
	ExistsById(ID string) bool

	// Returns all instances of the type.
	FindAll() ([]*openapi.IsdnList, error)

	// Returns all instances of the type T with the given IDs.
	FindAllById(ids []string) ([]*openapi.IsdnList, error)

	// Retrieves an entity by its id.
	FindById(ID string) (*openapi.IsdnList, error)

	// Saves a given entity.
	Save(entity *openapi.IsdnList) error

	// Saves all given entities.
	SaveAll(entities []*openapi.IsdnList) error
}
