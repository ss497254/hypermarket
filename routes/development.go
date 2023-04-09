package routes

import (
	"sas/database"

	"github.com/gofiber/fiber/v2"
)

func RunQuery(c *fiber.Ctx) error {
	if string(c.Request().Header.ContentType()) != "text/plain" {
		return c.JSON(fiber.Map{
			"message": `invalid body format (accepts only "text/plain")`,
			"success": false,
		})
	}

	res, err := database.Query(string(c.Body()))

	if err != nil {

		return c.JSON(fiber.Map{
			"message": err.Error(),
			"success": true,
		})
	}

	return c.JSON(fiber.Map{
		"message": res,
		"success": true,
	})
}
