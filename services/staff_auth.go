package services

import (
	"hypermarket/daos"
	"hypermarket/entities"
	"hypermarket/lib"
)

func StaffLogin(username string, password string) error {
	staff, err := daos.GetStaffByUsername(username)
	if err != nil {
		return err
	}

	if err := lib.ComparePasswords(staff.Password, password); err != nil {
		return err
	}

	return nil
}

func StaffRegister(staff *entities.Staff) error {
	staff.Password = lib.HashAndSalt(staff.Password)

	return daos.CreateStaff(staff)
}
