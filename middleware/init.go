package middleware

import (
	"hypermarket/config"
	"hypermarket/lib"

	"github.com/gofiber/fiber/v2"
)

func Init(c *fiber.Ctx) error {
	conf := config.GetConfig()
	c.Accepts("application/json")

	cookie := c.Cookies(conf.COOKIE_NAME)

	if cookie != "" {
		session, err := lib.ParseJWT(cookie, conf.COOKIE_SECRET)

		if err == nil {
			c.Locals("username", session["username"])
			c.Locals("role", session["role"])
		}
	}

	return c.Next()
}
