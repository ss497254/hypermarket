package routes

import (
	"hypermarket/entities"
	"hypermarket/services"

	"github.com/gofiber/fiber/v2"
)

func CreateOrder(c *fiber.Ctx) error {
	order := new(entities.Order)

	if err := c.BodyParser(order); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid data received",
			"error":   err.Error(),
		})
	}

	id, err := services.CreateOrder(order)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to load order",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"data":    fiber.Map{"id": id},
		"success": true,
		"message": "order added successfully",
	})
}

func GetOrders(c *fiber.Ctx) error {
	orders, err := services.GetOrders()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to load order",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    orders,
	})
}

func GetOrderById(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid id",
			"error":   err.Error(),
		})
	}

	order, err := services.GetOrderById(id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to load order",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    order,
	})
}

func GetOrdersByStaffUsername(c *fiber.Ctx) error {
	staff_username := c.Locals("username").(string)

	orders, err := services.GetOrdersByStaffUsername(staff_username)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to load orders",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    orders,
	})
}

func UpdateOrdersById(c *fiber.Ctx) error {
	return nil
}

func DeleteOrdersById(c *fiber.Ctx) error {
	return nil
}
