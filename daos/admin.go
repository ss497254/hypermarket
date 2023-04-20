package daos

import (
	"hypermarket/database"
	"hypermarket/entities"
)

func CreateAdmin(admin *entities.Admin) error {
	_, err := database.DB.Exec("insert into admins(username, firstName, lastName, password) values($1, $2, $3, $4)", admin.Username, admin.FirstName, admin.LastName, admin.Password)

	return err
}

func GetAdminByUsername(username string) (*entities.Admin, error) {
	row := database.QueryRow("select * from admins where username=$1", username)

	var admin = entities.Admin{}

	err := row.StructScan(&admin)
	if err != nil {
		return nil, err
	}

	return &admin, nil
}

func UpdateAdmin(admin *entities.Admin) error {
	_, err := database.DB.Exec("update admins set firstName = $1, lastName = $2, password = $3 where username = $4", admin.FirstName, admin.LastName, admin.Password, admin.Username)

	return err
}

func DeleteAdminByUsernameAndPassword(username string, password string) error {
	return nil
}
