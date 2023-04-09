package middleware

import (
	"sas/config"
	"sas/lib"

	"github.com/gofiber/fiber/v2"
)

func Init(c *fiber.Ctx) error {
	conf := config.GetConfig()
	c.Accepts("application/json")

	cookie := c.Cookies(conf.COOKIE_NAME)

	if cookie != "" {
		session, err := lib.ParseJWT(cookie, conf.COOKIE_SECRET)

		if err == nil {
			c.Locals("session", session)
		}
	}

	return c.Next()
}
