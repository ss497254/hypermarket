package lib

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtParser = jwt.NewParser(jwt.WithValidMethods([]string{"HS256"}))

func ParseUnverifiedJWT(token string) (jwt.MapClaims, error) {
	claims := jwt.MapClaims{}

	parser := &jwt.Parser{}
	_, _, err := parser.ParseUnverified(token, claims)

	return claims, err
}

func ParseJWT(token string, verificationKey string) (jwt.MapClaims, error) {
	parsedToken, err := jwtParser.Parse(token, func(t *jwt.Token) (any, error) {
		return []byte(verificationKey), nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := parsedToken.Claims.(jwt.MapClaims); ok && parsedToken.Valid {
		return claims, nil
	}

	return nil, errors.New("unable to parse token")
}

func GenerateJWT(payload jwt.MapClaims, signingKey string, secondsDuration int) (string, error) {
	seconds := time.Duration(secondsDuration) * time.Second

	claims := jwt.MapClaims{
		"exp": time.Now().Add(seconds).Unix(),
	}

	for k, v := range payload {
		claims[k] = v
	}

	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(signingKey))
}
