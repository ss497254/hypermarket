package routes

import (
	"context"
	"fmt"
	"sas/database"
	"sas/migrations"

	"github.com/gofiber/fiber/v2"
)

func SyncDB(c *fiber.Ctx) error {
	ctx := context.Background()

	err := database.RunMigrations(ctx, migrations.ALL)
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
