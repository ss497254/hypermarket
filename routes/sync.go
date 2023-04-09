package routes

import (
	"fmt"
	"sas/database"

	"github.com/gofiber/fiber/v2"
)

func SyncDB(c *fiber.Ctx) error {
	err := database.RunMigrations()
	if err != nil {
		fmt.Println(err)

		return c.JSON(fiber.Map{
			"message": "migrations failed",
			"success": false,
		})
	}

	return c.JSON(fiber.Map{
		"message": "migrations applied successfully",
		"success": true,
	})
}
