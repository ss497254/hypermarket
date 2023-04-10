package database

import "github.com/jmoiron/sqlx"

func initPragmas(db *sqlx.DB) error {
	_, err := db.Query(`
		PRAGMA busy_timeout       = 10000;
		PRAGMA journal_mode       = WAL;
		PRAGMA journal_size_limit = 200000000;
		PRAGMA synchronous        = NORMAL;
		PRAGMA foreign_keys       = TRUE;
	`)

	return err
}
