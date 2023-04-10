package routes

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func GetAdmin(c *fiber.Ctx) error {
	username := c.Locals("username")

	fmt.Println(username)

	c.JSON(fiber.Map{
		"name":     "Saurabh Singh",
		"username": username,
	})

	return nil
}

func UpdateAdmin() {

}

func DeleteAdmin() {

}
