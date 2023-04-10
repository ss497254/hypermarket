package routes

import (
	"sas/middleware"
	"sas/utils"

	"github.com/gofiber/fiber/v2"
)

func Initalize(app *fiber.App) {
	apiRoute := app.Group("/api")

	apiRoute.Post("/login", StaffLogin)
	apiRoute.Post("/register", StaffRegister)
	apiRoute.Get("/me", middleware.IsStaff, GetStaff)

	adminApp := apiRoute.Group("/admin")

	adminApp.Post("/login", AdminLogin)
	adminApp.Post("/register", AdminRegister)
	adminApp.Get("/me", middleware.IsAdmin, GetAdmin)

	if utils.IsDev() {
		developmentApp := apiRoute.Group("/dev")
		developmentApp.Post("/query", RunQuery)
	}
}
