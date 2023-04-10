package routes

import (
	"net/http"
	"sas/client"
	"sas/middleware"
	"sas/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
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

	app.Use("/admin", filesystem.New(filesystem.Config{
		Root:         http.FS(client.AdminWebsiteSource),
		PathPrefix:   "apps/admin/out",
		NotFoundFile: "apps/admin/out/404.html",
		Browse:       true,
	}))

	app.Use("/", filesystem.New(filesystem.Config{
		Root:         http.FS(client.WebsiteSource),
		PathPrefix:   "apps/web/out",
		NotFoundFile: "apps/web/out/404.html",
		Browse:       true,
	}))
}
