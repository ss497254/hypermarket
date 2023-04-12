package routes

import (
	"hypermarket/services"

	"github.com/gofiber/fiber/v2"
)

func GetStaffs(c *fiber.Ctx) error {
	staffs, err := services.GetStaffs()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to load staff",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    staffs,
	})
}

func GetStaff(c *fiber.Ctx) error {
	username := c.Locals("username").(string)

	staff, err := services.GetStaffByUsername(username)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to find staff",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    staff,
	})
}

func UpdateStaff() {

}

func DeleteStaff() {

}
