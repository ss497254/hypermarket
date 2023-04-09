package lib

import (
	"sas/config"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func SendAccessToken(payload jwt.MapClaims, c *fiber.Ctx) {
	conf := config.GetConfig()

	jwt, err := GenerateJWT(payload, conf.COOKIE_SECRET, conf.COOKIE_MAXAGE)

	if err == nil {
		c.Cookie(&fiber.Cookie{
			Name:     conf.COOKIE_NAME,
			Value:    jwt,
			Domain:   conf.COOKIE_DOMAIN,
			MaxAge:   conf.COOKIE_MAXAGE,
			SameSite: conf.COOKIE_SAMESITE,
		})
	}
}

func ClearAccessToken(c *fiber.Ctx) {
	conf := config.GetConfig()

	c.ClearCookie(conf.COOKIE_NAME)
}
