package services

import (
	"hypermarket/daos"
	"hypermarket/entities"
	"hypermarket/lib"
)

func GetAdminByUsername(username string) (*entities.Admin, error) {
	return daos.GetAdminByUsername(username)
}

func UpdateAdmin(admin *entities.Admin) error {
	admin.Password = lib.HashAndSalt(admin.Password)

	return daos.UpdateAdmin(admin)
}

func DeleteAdmin(username string, password string) error {
	return nil
}
