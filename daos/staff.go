package daos

import (
	"hypermarket/database"
	"hypermarket/entities"
)

func CreateStaff(staff *entities.Staff) error {
	_, err := database.DB.Exec("insert into staffs(username, firstName, lastName, password, mobile, address) values($1, $2, $3, $4, $5, $6)",
		staff.Username,
		staff.FirstName,
		staff.LastName,
		staff.Password,
		staff.Mobile,
		staff.Address)

	return err
}

func GetStaffByUsername(username string) (*entities.Staff, error) {
	row := database.QueryRow("Select * from staffs where username=$1", username)

	var staff = entities.Staff{}

	err := row.StructScan(&staff)
	if err != nil {
		return nil, err
	}

	return &staff, nil
}

func UpdateStaffByUsername(username string) error {
	return nil
}

func DeleteStaffByUsername(username string) error {
	return nil
}
