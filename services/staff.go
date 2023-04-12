package services

import (
	"hypermarket/daos"
	"hypermarket/entities"
)

func GetStaffs() (*[]entities.Staff, error) {
	return daos.GetStaffs()
}

func GetStaffByUsername(username string) (*entities.Staff, error) {
	return daos.GetStaffByUsername(username)
}

func UpdateStaff(staff *entities.Staff) error {
	return nil
}

func DeleteStaff(username string) error {
	return nil
}
