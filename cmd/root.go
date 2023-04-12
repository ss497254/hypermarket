package cmd

import (
	"log"

	"github.com/spf13/cobra"
)

var rootCmd *cobra.Command

func Init(start func(cmd *cobra.Command, args []string)) {
	rootCmd = &cobra.Command{
		Use:   "hypermarket",
		Short: "Sas is supermarket automation system",
		Long:  `Sas will help to manage and automate your supermarket.`,
		Run:   start,
	}

	rootCmd.AddCommand(generateConfigCmd)
	rootCmd.PersistentFlags().String("config", "./config.json", "path to config.json file (default is ./config.json)")
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		log.Fatal(err)
	}
}
