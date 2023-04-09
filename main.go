package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"sas/cmd"
	"sas/config"
	"sas/database"
	"sas/middleware"
	"sas/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/spf13/cobra"
)

func start(cmd *cobra.Command, args []string) {
	configFilePath := cmd.Flag("config").Value.String()

	config.SetUpConfig(configFilePath)
	database.ConnectDB()

	conf := config.GetConfig()

	app := fiber.New(fiber.Config{
		AppName: "Supermarket automation system",
	})

	app.Use(logger.New())
	app.Use(middleware.Init)
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Accept,Authorization,Content-Type,X-CSRF-TOKEN",
		ExposeHeaders:    "Link",
		AllowCredentials: true,
	}))

	routes.Initalize(app)

	app.Use(middleware.NotFound)

	serverAddress := fmt.Sprintf("%s:%s", conf.SERVER_IP, conf.SERVER_PORT)

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	go func() {
		<-c

		fmt.Println("Gracefully shutting down")
		database.Close()

		app.Shutdown()
	}()

	log.Fatal(app.Listen(serverAddress))
}

func main() {
	cmd.Init(start)
	cmd.Execute()
}
