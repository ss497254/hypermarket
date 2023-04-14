package services

import (
	"hypermarket/daos"
	"hypermarket/entities"
	"hypermarket/lib"
)

func AdminLogin(username string, password string) error {
	admin, err := daos.GetAdminByUsername(username)
	if err != nil {
		return err
	}

	if err := lib.ComparePasswords(admin.Password, password); err != nil {
		return err
	}

	return nil
}

func AdminRegister(admin *entities.Admin) error {
	admin.Password = lib.HashAndSalt(admin.Password)

	return daos.CreateAdmin(admin)
}
