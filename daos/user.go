package daos

import (
	"sas/database"
	"sas/entities"
)

func CreateUser(user *entities.User) error {
	_, err := database.DB.Exec("insert into users(username, firstName, lastName, password, mobile, address) values($1, $2, $3, $4, $5, $6)",
		user.Username,
		user.FirstName,
		user.LastName,
		user.Password,
		user.Mobile,
		user.Address)

	return err
}

func GetUserByUsername(username string) (*entities.User, error) {
	row := database.QueryRow("Select * from users where username=$1", username)

	var user = entities.User{}

	err := row.StructScan(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func UpdateUserByUsername(username string) error {
	return nil
}

func DeleteUserByUsername(username string) error {
	return nil
}
