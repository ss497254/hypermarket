package lib

import (
	"encoding/json"
	"sas/config"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type SessionToken struct {
	Username string `json:"username"`
	Role     string `json:"role"`
}

func SendAccessToken(sesion *SessionToken, c *fiber.Ctx) error {
	conf := config.GetConfig()

	jsonPayload, err := json.Marshal(sesion)
	if err != nil {
		return err
	}

	payload := jwt.MapClaims{}
	json.Unmarshal(jsonPayload, &payload)

	jwt, err := GenerateJWT(payload, conf.COOKIE_SECRET, conf.COOKIE_MAXAGE)

	if err != nil {
		return err
	}

	c.Cookie(&fiber.Cookie{
		Name:     conf.COOKIE_NAME,
		Value:    jwt,
		Domain:   conf.COOKIE_DOMAIN,
		MaxAge:   conf.COOKIE_MAXAGE,
		SameSite: conf.COOKIE_SAMESITE,
	})

	return nil
}

func ClearAccessToken(c *fiber.Ctx) {
	conf := config.GetConfig()

	c.ClearCookie(conf.COOKIE_NAME)
}
