package cmd

import (
	"hypermarket/config"
	"hypermarket/database"

	"github.com/spf13/cobra"
)

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "run migrations on your database",
	Long:  `It will run migrations on your database, make sure to run this at setup`,
	Run: func(cmd *cobra.Command, args []string) {
		configFilePath := cmd.Flag("config").Value.String()
		config.SetUpConfig(configFilePath)

		database.ConnectDB()
		database.RunMigrations()
	},
}
