package repositories

// CrudRepository provide basic information about a repository
type CrudRepository interface {
	// Returns the number of entities available.
	Count() int

	// Deletes a given entity.
	Delete(entity interface{})

	// Deletes all entities managed by the repository.
	DeleteAll()

	// Deletes the given entities.
	DeleteAllEntities(entities []interface{})

	// Deletes all instances of the type T with the given IDs.
	DeleteAllById(ids []interface{})

	// Deletes the entity with the given id.
	DeleteById(ID interface{})

	// Returns whether an entity with the given id exists.
	ExistsById(ID interface{}) bool

	// Returns all instances of the type.
	FindAll() []interface{}

	// Returns all instances of the type T with the given IDs.
	FindAllById(IDs []interface{}) []interface{}

	// Retrieves an entity by its id.
	FindById(ID interface{}) interface{}

	// Saves a given entity.
	Save(entity interface{})

	// Saves all given entities.
	SaveAll(entities []interface{})
}
