package controllers

import (
	"fmt"
	"sas/daos"
	"sas/entities"
)

func GetAdminByUsername(username string) (*entities.Admin, error) {
	admin, err := daos.GetAdminByUsername(username)

	if err != nil {
		return nil, fmt.Errorf("unable to find admin, %s", err.Error())
	}

	return admin, nil
}

func UpdateAdmin(admin *entities.Admin) error {
	return nil
}

func DeleteAdmin(username string, password string) error {
	return nil
}
