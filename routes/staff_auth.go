package routes

import (
	"hypermarket/entities"
	"hypermarket/lib"
	"hypermarket/services"

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
			"error":   err.Error(),
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

func StaffRegister(c *fiber.Ctx) error {
	staff := new(entities.Staff)

	if err := c.BodyParser(staff); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid data received",
			"error":   err.Error(),
		})
	}

	err := services.StaffRegister(staff)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "registration failed",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "registration successful",
	})
}
