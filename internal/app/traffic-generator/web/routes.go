package web

import (
	"github.com/dinhtrung/smpptools/internal/app/traffic-generator/instances"
	"github.com/dinhtrung/smpptools/internal/app/traffic-generator/repositories"
	"github.com/dinhtrung/smpptools/internal/app/traffic-generator/web/api"
	"github.com/gofiber/fiber/v2"
)

func SetupRepositories() {
	instances.TestCaseRepo = repositories.NewTestCaseRepository()
	instances.TestSessionRepo = repositories.NewTestSessionRepository()
	instances.TestSetupRepo = repositories.NewTestSetupRepository()
}

func SetupRoutes(app fiber.Router) {
	app.Get("/test-setups", api.GetAllTestSetupsUsingGET)
	app.Get("/test-setups/:id", api.GetTestSetupUsingGET)

	app.Post("/test-setups", api.CreateTestSetupUsingPOST)
	app.Delete("/test-setups/:id", api.DeleteTestSetupUsingDELETE)
	app.Patch("/test-setups/:id", api.PartialUpdateTestSetupUsingPATCH)
	app.Put("/test-setups/:id", api.UpdateTestSetupUsingPUT)

	app.Post("/test-sessions", api.CreateTestSessionUsingPOST)
	app.Delete("/test-sessions/:id", api.DeleteTestSessionUsingDELETE)
	app.Get("/test-sessions", api.GetAllTestSessionsUsingGET)
	app.Get("/test-sessions/:id", api.GetTestSessionUsingGET)
	app.Patch("/test-sessions/:id", api.PartialUpdateTestSessionUsingPATCH)
	app.Put("/test-sessions/:id", api.UpdateTestSessionUsingPUT)

	app.Post("/test-cases", api.CreateTestCaseUsingPOST)
	app.Delete("/test-cases/:id", api.DeleteTestCaseUsingDELETE)
	app.Get("/test-cases", api.GetAllTestCasesUsingGET)
	app.Get("/test-cases/:id", api.GetTestCaseUsingGET)
	app.Patch("/test-cases/:id", api.PartialUpdateTestCaseUsingPATCH)
	app.Put("/test-cases/:id", api.UpdateTestCaseUsingPUT)
}
