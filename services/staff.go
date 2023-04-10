package services

import (
	"sas/daos"
	"sas/entities"
)

func GetStaffByUsername(username string) (*entities.Staff, error) {
	return daos.GetStaffByUsername(username)
}

func UpdateStaff(staff *entities.Staff) error {
	return nil
}

func DeleteStaff(username string) error {
	return nil
}
