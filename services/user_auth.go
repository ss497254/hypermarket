package services

import (
	"fmt"
	"sas/daos"
	"sas/entities"
	"sas/lib"
)

func UserLogin(username string, password string) error {
	user, err := daos.GetUserByUsername(username)
	if err != nil {
		return fmt.Errorf("user authentication failed, %s", err.Error())
	}

	if err := lib.ComparePasswords(user.Password, password); err != nil {
		return fmt.Errorf("user authentication failed")
	}

	return nil
}

func UserRegister(user *entities.User) error {
	user.Password = lib.HashAndSalt(user.Password)

	if err := daos.CreateUser(user); err != nil {
		return fmt.Errorf("cannot create user, %s", err.Error())
	}

	return nil
}
