package database

func GetAllTables() ([]string, error) {
	return Query(`SELECT name FROM sqlite_master WHERE type='table'`)
}

func Query(query string) ([]string, error) {
	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	var output []string

	for rows.Next() {
		var i string
		err = rows.Scan(&i)
		if err != nil {
			return nil, err
		}

		output = append(output, i)
	}

	return output, nil
}

func LastMigration() (string, error) {
	res, err := Query("SELECT name FROM migrations ORDER BY id DESC LIMIT 1")
	if err != nil || len(res) == 0 {
		return "", err
	}

	return res[0], nil
}

func GetAllMigrations() ([]string, error) {
	res, err := Query("SELECT name FROM migrations ORDER BY id DESC")
	if err != nil || len(res) == 0 {
		return nil, err
	}

	return res, nil
}
