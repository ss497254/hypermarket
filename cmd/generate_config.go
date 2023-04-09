package cmd

import (
	"sas/config"

	"github.com/spf13/cobra"
)

var generateConfigCmd = &cobra.Command{
	Use:   "generate-config",
	Short: "create a empty config.json file with all the available options",
	Long:  `config.json is needed to start the server, this command will create a config.json file which you can modify. You can also pass "--config" flag followed by path where you want to store your config file.`,
	Run: func(cmd *cobra.Command, args []string) {
		configFilePath := cmd.Flag("config").Value.String()
		config.GenerateDemoConfig(configFilePath)
	},
}
