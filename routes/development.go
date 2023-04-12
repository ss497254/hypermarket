package routes

import (
	"hypermarket/database"

	"github.com/gofiber/fiber/v2"
)

func RunQuery(c *fiber.Ctx) error {
	if string(c.Request().Header.ContentType()) != "text/plain" {
		return c.JSON(fiber.Map{
			"message": `invalid body format (accepts only "text/plain")`,
			"success": false,
		})
	}

	rows, err := database.Query(string(c.Body()))
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
			"success": true,
		})
	}

	defer rows.Close()

	var res []any

	for rows.Next() {
		cols := make(map[string]interface{})

		err := rows.MapScan(cols)
		if err != nil {
			break
		}

		res = append(res, cols)
	}

	return c.JSON(fiber.Map{
		"message": res,
		"success": true,
	})
}
