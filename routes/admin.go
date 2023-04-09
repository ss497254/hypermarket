package routes

import (
	"github.com/gofiber/fiber/v2"
)

func GetAdmin(c *fiber.Ctx) error {
	session := c.Locals("session")

	c.JSON(fiber.Map{
		"name":    "Saurabh Singh",
		"session": session,
	})

	return nil
}

func UpdateAdmin() {

}

func DeleteAdmin() {

}
