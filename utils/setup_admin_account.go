package utils

import (
	"sas/config"
	"sas/entities"
	"sas/services"

	"github.com/fatih/color"
)

func SetupAdminAccount() {
	conf := config.GetConfig()

	if err := services.AdminRegister(&entities.Admin{
		Username: conf.ADMIN_USERNAME,
		Password: conf.ADMIN_PASSWORD,
	}); err == nil {
		color.Green("Admin account added successfully.")
	}
}
