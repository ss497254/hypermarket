package routes

import (
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func Initalize(app *fiber.App) {
	app.Get("/me", middleware.Authenticated, GetUser)
}
