package services

import (
	"fmt"
	"sas/daos"
	"sas/entities"
)

func GetUserByUsername(username string) (*entities.User, error) {
	user, err := daos.GetUserByUsername(username)

	if err != nil {
		return nil, fmt.Errorf("unable to find user, %s", err.Error())
	}

	return user, nil
}

func UpdateUser(user *entities.User) error {
	return nil
}

func DeleteUser(username string) error {
	return nil
}
