package routes

import (
	"hypermarket/entities"
	"hypermarket/services"

	"github.com/gofiber/fiber/v2"
)

func CreateProduct(c *fiber.Ctx) error {
	product := new(entities.Product)

	if err := c.BodyParser(product); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid data received",
			"error":   err.Error(),
		})
	}

	id, err := services.CreateProduct(product)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to load product",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"data":    fiber.Map{"id": id},
		"success": true,
		"message": "product added successfully",
	})
}

func GetProducts(c *fiber.Ctx) error {
	products, err := services.GetProducts()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to load product",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    products,
	})
}

func GetProductById(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "invalid id",
			"error":   err.Error(),
		})
	}

	product, err := services.GetProductById(id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "unable to load product",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    product,
	})
}

func UpdateProductsById(c *fiber.Ctx) error {
	return nil
}

func DeleteProductsById(c *fiber.Ctx) error {
	return nil
}
