package main

import (
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

func main() {
	app := fiber.New()
	app.Use(filesystem.New(filesystem.Config{
		Root: http.Dir("./assets"),
	}))
	log.Fatal(app.Listen(":8888"))
}
