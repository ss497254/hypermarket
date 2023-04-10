package services

import (
	"fmt"
	"sas/daos"
	"sas/entities"
	"sas/lib"
)

func AdminLogin(username string, password string) error {
	admin, err := daos.GetAdminByUsername(username)
	if err != nil {
		return fmt.Errorf("admin authentication failed, %s", err.Error())
	}

	if err := lib.ComparePasswords(admin.Password, password); err != nil {
		return fmt.Errorf("admin authentication failed")
	}

	return nil
}

func AdminRegister(admin *entities.Admin) error {
	admin.Password = lib.HashAndSalt(admin.Password)

	if err := daos.CreateAdmin(admin); err != nil {
		return fmt.Errorf("cannot create admin, %s", err.Error())
	}

	return nil
}
