package services

import (
	"sas/daos"
	"sas/entities"
)

func GetAdminByUsername(username string) (*entities.Admin, error) {
	return daos.GetAdminByUsername(username)
}

func UpdateAdmin(admin *entities.Admin) error {
	return nil
}

func DeleteAdmin(username string, password string) error {
	return nil
}
