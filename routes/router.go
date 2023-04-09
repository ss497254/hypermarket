package routes

import (
	"sas/middleware"

	"github.com/gofiber/fiber/v2"
)

func Initalize(app *fiber.App) {
	adminApp := app.Group("/admin")

	adminApp.Post("/login", AdminLogin)
	adminApp.Post("/register", AdminRegister)
	adminApp.Post("/all", GetAllAdmins)
	adminApp.Get("/me", middleware.Authenticated, GetAdmin)
}
