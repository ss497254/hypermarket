package config

import (
	"fmt"
)

type config struct {
	PORT              string
	SHOW_CONFIG       string
	DB_HOST           string
	DB_USERNAME       string
	DB_PASSWORD       string
	DB_NAME           string
	DB_CLUSTER        string
	COOKIE_NAME       string
	COOKIE_SECRET     string
	COOKIE_EXPIRES_IN string
	COOKIE_SECURE     string
	COOKIE_SAMESITE   string
	COOKIE_DOMAIN     string
	COOKIE_MAXAGE     int
}

var Config *config

func SetUpConfig() {
	Config = &config{
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

func ShowConfigDetails() {
	if Config.SHOW_CONFIG == "true" {
		fmt.Printf("%+v\n", Config)
	} else {
		fmt.Println("Config is not available!")
	}
}
