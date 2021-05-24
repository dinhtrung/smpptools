package interfaces

import "github.com/dinhtrung/smpptools/internal/pkg/domain"

// CrudRepository provide basic information about a repository
type TestSessionCrudRepository interface {
	// Returns the number of entities available.
	Count() (int, error)

	// Deletes a given entity.
	Delete(entity *domain.TestSession) error

	// Deletes all entities managed by the repository.
	DeleteAll() error

	// Deletes the given entities.
	DeleteAllEntities(entities []*domain.TestSession) error

	// Deletes all instances of the type T with the given IDs.
	DeleteAllById(ids []string) error

	// Deletes the entity with the given id.
	DeleteById(ID string) error

	// Returns whether an entity with the given id exists.
	ExistsById(ID string) bool

	// Returns all instances of the type.
	FindAll() ([]*domain.TestSession, error)

	// Returns all instances of the type T with the given IDs.
	FindAllById(ids []string) ([]*domain.TestSession, error)

	// Retrieves an entity by its id.
	FindById(ID string) (*domain.TestSession, error)

	// Saves a given entity.
	Save(entity *domain.TestSession) error

	// Saves all given entities.
	SaveAll(entities []*domain.TestSession) error
}
