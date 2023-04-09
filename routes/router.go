package routes

import (
	"sas/middleware"

	"github.com/gofiber/fiber/v2"
)

func Initalize(app *fiber.App) {
	app.Get("/sync", SyncDB)

	adminApp := app.Group("/admin")

	adminApp.Get("/me", middleware.Authenticated, GetAdmin)
	adminApp.Post("/login", AdminLogin)
	adminApp.Post("/register", AdminRegister)
}
