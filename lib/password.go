package lib

import "golang.org/x/crypto/bcrypt"

func ComparePasswords(hashedPassword string, plainPassword string) bool {
	byteHashPassword := []byte(hashedPassword)
	bytePlainPassword := []byte(plainPassword)
	err := bcrypt.CompareHashAndPassword(byteHashPassword, bytePlainPassword)
	return err == nil
}

func HashAndSalt(pwd string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.MinCost)

	if err != nil {
		return ""
	}

	return string(hash)
}
