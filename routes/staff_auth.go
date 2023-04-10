package routes

import (
	"sas/lib"
	"sas/services"

	"github.com/fatih/color"
	"github.com/gofiber/fiber/v2"
)

func StaffLogin(c *fiber.Ctx) error {
	type LoginRequest struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	json := new(LoginRequest)

	if err := c.BodyParser(json); err != nil || json.Username == "" || json.Password == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid data received",
		})
	}

	if err := services.StaffLogin(json.Username, json.Password); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "login failed",
			"error":   err.Error(),
		})
	}

	if err := lib.SendAccessToken(&lib.SessionToken{Username: json.Username, Role: "staff"}, c); err != nil {
		color.Red(err.Error())
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "login successful",
	})
}
