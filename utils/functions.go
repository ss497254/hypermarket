package utils

import (
	"encoding/json"
	"fmt"
)

func JSON_Stringify(v any) string {
	res, err := json.Marshal(v)

	if err != nil {
		fmt.Println("Unable to parse JSON")
		return "{}"
	}

	return string(res)
}
