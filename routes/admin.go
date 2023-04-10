package routes

import (
	"sas/services"

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

func UpdateAdmin() {

}

func DeleteAdmin() {

}
