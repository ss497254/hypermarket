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

	apiRoute.Get("/products", middleware.IsAuth, GetProducts)
	apiRoute.Post("/products", middleware.IsAuth, CreateProduct)
	apiRoute.Get("/products/:id", middleware.IsAuth, GetProductsById)
	apiRoute.Put("/products/:id", middleware.IsAuth, UpdateProductsById)
	apiRoute.Delete("/products/:id", middleware.IsAuth, DeleteProductsById)

	adminRoutes := apiRoute.Group("/admin")
	adminRoutes.Post("/login", AdminLogin)
	adminRoutes.Post("/register", AdminRegister)
	adminRoutes.Get("/me", middleware.IsAdmin, GetAdmin)

	if utils.IsDev() {
		devRouts := apiRoute.Group("/dev")
		devRouts.Post("/query", RunQuery)
	}
}
