package database

import (
	"log"
)

func Query(query string) ([]string, error) {
	rows, err := DB.Query(query)
	if err != nil {
		log.Fatal(err)
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
