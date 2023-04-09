package routes

import (
	"sas/middleware"
	"sas/utils"

	"github.com/gofiber/fiber/v2"
)

func Initalize(app *fiber.App) {
	adminApp := app.Group("/admin")
	developmentApp := app.Group("/dev")

	adminApp.Get("/me", middleware.Authenticated, GetAdmin)
	adminApp.Post("/login", AdminLogin)
	adminApp.Post("/register", AdminRegister)

	if utils.IsDev() {
		developmentApp.Post("/query", RunQuery)
	}
}
