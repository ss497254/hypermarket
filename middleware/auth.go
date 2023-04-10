package middleware

import "github.com/gofiber/fiber/v2"

func IsStaff(c *fiber.Ctx) error {
	username := c.Locals("username")
	role := c.Locals("role")

	if username != nil && role == "staff" {
		return c.Next()
	}

	return c.Status(401).JSON(&fiber.Map{
		"message": "please login to continue",
	})
}

func IsAdmin(c *fiber.Ctx) error {
	username := c.Locals("username")
	role := c.Locals("role")

	if username != nil && role == "admin" {
		return c.Next()
	}

	return c.Status(401).JSON(&fiber.Map{
		"message": "please login to continue",
	})
}
