package routes

import (
	"hypermarket/lib"

	"github.com/gofiber/fiber/v2"
)

func Logout(c *fiber.Ctx) error {
	lib.ClearAccessToken(c)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "logout successful",
	})
}
