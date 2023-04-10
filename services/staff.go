package services

import (
	"fmt"
	"sas/daos"
	"sas/entities"
)

func GetStaffByUsername(username string) (*entities.Staff, error) {
	staff, err := daos.GetStaffByUsername(username)

	if err != nil {
		return nil, fmt.Errorf("unable to find staff, %s", err.Error())
	}

	return staff, nil
}

func UpdateStaff(staff *entities.Staff) error {
	return nil
}

func DeleteStaff(username string) error {
	return nil
}
