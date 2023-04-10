package database

import "github.com/jmoiron/sqlx"

func GetAllTables() ([]string, error) {
	rows, err := Query(`SELECT name FROM sqlite_master WHERE type='table'`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []string

	for rows.Next() {
		var val string
		err = rows.Scan(&val)
		if err != nil {
			return nil, err
		}

		res = append(res, val)
	}

	return res, nil
}

func Query(query string) (*sqlx.Rows, error) {
	return DB.Queryx(query)
}

func QueryRow(query string, args ...interface{}) *sqlx.Row {
	return DB.QueryRowx(query, args...)
}

func LastMigration() (string, error) {
	row := DB.QueryRowx("SELECT name FROM migrations ORDER BY id DESC LIMIT 1")

	var res string
	row.Scan(&res)

	return res, nil
}

func GetAllMigrations() ([]string, error) {
	rows, err := Query("SELECT name FROM migrations ORDER BY id DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []string

	for rows.Next() {
		var val string
		err = rows.Scan(&val)
		if err != nil {
			return nil, err
		}

		res = append(res, val)
	}

	return res, nil
}
