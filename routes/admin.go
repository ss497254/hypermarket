package routes

import (
	"hypermarket/entities"
	"hypermarket/services"

	"github.com/gofiber/fiber/v2"
)

func GetAdmin(c *fiber.Ctx) error {
	username := c.Locals("username").(string)

	admin, err := services.GetAdminByUsername(username)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to find admin",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    admin,
	})
}

func UpdateAdmin(c *fiber.Ctx) error {
	admin := new(entities.Admin)

	if err := c.BodyParser(admin); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid data received",
			"error":   err.Error(),
		})
	}

	err := services.UpdateAdmin(admin)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "unable to update admin data",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "update successful",
	})

}

func DeleteAdmin() {

}
