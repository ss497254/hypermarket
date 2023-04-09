package routes

import (
	"fmt"
	"sas/database"
	"sas/lib"
	"sas/models"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
)

func AdminLogin(c *fiber.Ctx) error {
	type LoginRequest struct {
		UserName string `json:"username"`
		Password string `json:"password"`
	}

	json := new(LoginRequest)
	if err := c.BodyParser(json); err != nil {
		return c.JSON(fiber.Map{
			"code":    400,
			"message": "invalid data received",
		})
	}

	result := models.Admin{}

	filter := bson.M{"username": json.UserName}

	if err := database.GetCollection("admin").FindOne(c.Context(), filter).Decode(&result); err != nil {
		return c.JSON(fiber.Map{
			"code":    404,
			"message": "user not found",
			"error":   err,
		})
	}

	if !lib.ComparePasswords(result.Password, []byte(json.Password)) {
		return c.JSON(fiber.Map{
			"code":    401,
			"message": "Invalid Password",
		})
	}

	lib.SendAccessToken(jwt.MapClaims{"username": result.UserName}, c)

	return c.JSON(fiber.Map{
		"code":     200,
		"message":  "sucess",
		"username": result.UserName,
	})
}

func AdminRegister(c *fiber.Ctx) error {
	type CreateUserRequest struct {
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		UserName  string `json:"username"`
		Password  string `json:"password"`
	}

	json := new(CreateUserRequest)
	if err := c.BodyParser(json); err != nil {
		return c.JSON(fiber.Map{
			"code":    400,
			"message": "Invalid JSON",
		})
	}

	password := lib.HashAndSalt([]byte(json.Password))

	result, err := database.GetCollection("admin").InsertOne(c.Context(), models.Admin{
		UserName:  json.UserName,
		FirstName: json.FirstName,
		LastName:  json.LastName,
		Password:  password,
	})

	if err != nil {
		return c.JSON(fiber.Map{
			"code":    400,
			"message": "user already exists",
		})
	}

	fmt.Println(result)

	return c.JSON(fiber.Map{
		"code":     200,
		"message":  "sucess",
		"username": json.UserName,
	})
}
