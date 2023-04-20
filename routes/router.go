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

	apiRoutes.Get("/products", GetProducts)
	apiRoutes.Get("/products/:id", GetProductById)
	apiRoutes.Post("/products", middleware.IsAuth, CreateProduct)
	apiRoutes.Put("/products", middleware.IsAuth, UpdateProduct)
	apiRoutes.Delete("/products/:id", middleware.IsAuth, DeleteProductsById)

	staffRoutes := apiRoutes.Group("/staff")
	staffRoutes.Post("/login", StaffLogin)
	staffRoutes.Get("/me", middleware.IsStaff, GetStaff)
	staffRoutes.Get("/orders", middleware.IsStaff, GetOrdersByStaffUsername)
	staffRoutes.Post("/orders", middleware.IsStaff, CreateOrder)
	staffRoutes.Get("/orders/:id", middleware.IsStaff, GetOrderById)
	staffRoutes.Post("/logout", middleware.IsStaff, Logout)

	adminRoutes := apiRoutes.Group("/admin")
	adminRoutes.Post("/login", AdminLogin)
	adminRoutes.Get("/me", middleware.IsAdmin, GetAdmin)
	adminRoutes.Post("/register", middleware.IsAdmin, AdminRegister)
	adminRoutes.Get("/staffs", middleware.IsAdmin, GetStaffs)
	adminRoutes.Post("/staffs", middleware.IsAdmin, StaffRegister)
	adminRoutes.Get("/orders", middleware.IsAdmin, GetOrders)
	adminRoutes.Get("/orders/:id", middleware.IsAdmin, GetOrderById)
	adminRoutes.Post("/logout", middleware.IsAdmin, Logout)

	if utils.IsDev() {
		devRouts := apiRoutes.Group("/dev")
		devRouts.Post("/query", RunQuery)
	}

	apiRoutes.Use(middleware.NotFound)

	app.Use("/", filesystem.New(filesystem.Config{
		Root:         http.FS(client.WebsiteSource),
		PathPrefix:   "dist",
		NotFoundFile: "dist/404.html",
	}))
}
