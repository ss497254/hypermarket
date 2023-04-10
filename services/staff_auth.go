package services

import (
	"fmt"
	"sas/daos"
	"sas/entities"
	"sas/lib"
)

func StaffLogin(username string, password string) error {
	staff, err := daos.GetStaffByUsername(username)
	if err != nil {
		return fmt.Errorf("staff authentication failed, %s", err.Error())
	}

	if err := lib.ComparePasswords(staff.Password, password); err != nil {
		return fmt.Errorf("staff authentication failed")
	}

	return nil
}

func StaffRegister(staff *entities.Staff) error {
	staff.Password = lib.HashAndSalt(staff.Password)

	if err := daos.CreateStaff(staff); err != nil {
		return fmt.Errorf("cannot create staff, %s", err.Error())
	}

	return nil
}
