package config

import (
	"fmt"
)

type Config struct {
	PORT            string `json:"port"`
	SHOW_CONFIG     string `json:"show_config"`
	DB_HOST         string `json:"db_host"`
	DB_USERNAME     string `json:"db_user"`
	DB_PASSWORD     string `json:"db_password"`
	DB_NAME         string `json:"db_name"`
	DB_CLUSTER      string `json:"db_cluster"`
	COOKIE_NAME     string `json:"cookie_name"`
	COOKIE_SECRET   string `json:"cookie_secret"`
	COOKIE_SECURE   string `json:"cookie_secure"`
	COOKIE_SAMESITE string `json:"cookie_samesite"`
	COOKIE_DOMAIN   string `json:"cookie_domain"`
	COOKIE_MAXAGE   int    `json:"cookie_maxage"`
}

var config *Config

func GenerateDemoConfig(path string) {

}

func SetUpConfig(path string) {
	config = &Config{
		PORT:            "8080",
		SHOW_CONFIG:     "true",
		DB_NAME:         "go-test-1",
		COOKIE_NAME:     "fin",
		COOKIE_SECRET:   ")Ff@#$RSAD(*&IFcxR32edfs",
		COOKIE_SAMESITE: "lax",
		COOKIE_DOMAIN:   "localhost",
		COOKIE_MAXAGE:   86400 * 30, // 30 days
		COOKIE_SECURE:   "false",
	}
}

func GetConfig() *Config {
	return config
}

func ShowConfigDetails() {
	if config.SHOW_CONFIG == "true" {
		fmt.Printf("%+v\n", config)
	} else {
		fmt.Println("config is not available!")
	}
}
