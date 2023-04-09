package database

import (
	"fmt"
	"log"
)

func Query(query string) {
	rows, err := DB.Query(query)
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()

	columns, err := rows.Columns()
	if err != nil {
		log.Fatal(err)
	}

	count := len(columns)
	values := make([]interface{}, count)
	scanArgs := make([]interface{}, count)

	for i := range values {
		scanArgs[i] = &values[i]
	}

	for rows.Next() {
		err := rows.Scan(scanArgs...)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(values...)
	}
}
