package lib

import (
	"golang.org/x/crypto/bcrypt"
)

func ComparePasswords(hashedPassword string, plainPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
}

func HashAndSalt(pwd string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.MinCost)

	if err != nil {
		return ""
	}

	return string(hash)
}
