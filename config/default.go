package config

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

type Config struct {
	SERVER_IP       string `json:"server_ip"`
	SERVER_PORT     string `json:"server_port"`
	SHOW_CONFIG     string `json:"show_config"`
	DB_PATH         string `json:"db_path"`
	COOKIE_NAME     string `json:"cookie_name"`
	COOKIE_SECRET   string `json:"cookie_secret"`
	COOKIE_SECURE   string `json:"cookie_secure"`
	COOKIE_SAMESITE string `json:"cookie_samesite"`
	COOKIE_DOMAIN   string `json:"cookie_domain"`
	COOKIE_MAXAGE   int    `json:"cookie_maxage"`
	ADMIN_USERNAME  string `json:"admin_username"`
	ADMIN_PASSWORD  string `json:"admin_password"`
}

var config *Config

func GenerateDemoConfig(path string) {
	f, _ := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0644)
	defer f.Close()

	// demo config
	content, err := json.MarshalIndent(Config{
		SERVER_IP:       "127.0.0.1",
		SERVER_PORT:     "8080",
		SHOW_CONFIG:     "true",
		DB_PATH:         "test.db",
		COOKIE_NAME:     "fan",
		COOKIE_SECRET:   "#DASR#GERT#",
		COOKIE_SAMESITE: "lax",
		COOKIE_DOMAIN:   "localhost",
		COOKIE_MAXAGE:   86400 * 30, // 30 days
		COOKIE_SECURE:   "false",
		ADMIN_USERNAME:  "admin",
		ADMIN_PASSWORD:  "admin",
	}, "", "	")

	if err != nil {
		fmt.Println(err)
	}

	f.WriteString(string(content))
}

func SetUpConfig(path string) {
	data, err := os.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(data, &config)
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
