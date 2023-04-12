package routes

import (
	"hypermarket/client"
	"hypermarket/middleware"
	"hypermarket/utils"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

func Initalize(app *fiber.App) {
	apiRoutes := app.Group("/api")

	apiRoutes.Post("/login", StaffLogin)
	apiRoutes.Post("/register", middleware.IsAdmin, StaffRegister)
	apiRoutes.Get("/me", middleware.IsStaff, GetStaff)

	apiRoutes.Get("/products", middleware.IsAuth, GetProducts)
	apiRoutes.Post("/products", middleware.IsAuth, CreateProduct)
	apiRoutes.Get("/products/:id", middleware.IsAuth, GetProductsById)
	apiRoutes.Put("/products/:id", middleware.IsAuth, UpdateProductsById)
	apiRoutes.Delete("/products/:id", middleware.IsAuth, DeleteProductsById)

	adminRoutes := apiRoutes.Group("/admin")
	adminRoutes.Post("/login", AdminLogin)
	adminRoutes.Get("/me", middleware.IsAdmin, GetAdmin)
	adminRoutes.Post("/register", middleware.IsAdmin, AdminRegister)
	adminRoutes.Post("/staff/register", middleware.IsAdmin, StaffRegister)

	if utils.IsDev() {
		devRouts := apiRoutes.Group("/dev")
		devRouts.Post("/query", RunQuery)
	}

	apiRoutes.Use(middleware.NotFound)

	app.Use("/", filesystem.New(filesystem.Config{
		Root:         http.FS(client.WebsiteSource),
		PathPrefix:   "dist",
		NotFoundFile: "dist/index.html",
		Browse:       true,
	}))
}
