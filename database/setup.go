package database

import (
	"database/sql"
	"log"
	"sas/config"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

func ConnectDB() {
	conf := config.GetConfig()

	db, err := sql.Open("sqlite", conf.DB_PATH)
	if err != nil {
		log.Fatal(err)
	}

	if err := initPragmas(db); err != nil {
		db.Close()
		log.Fatal(err)
	}

	DB = db
}

func Close() error {
	return DB.Close()
}
