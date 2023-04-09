package utils

import (
	"os"
	"strings"
)

func IsDev() bool {
	return strings.HasPrefix(os.Args[0], os.TempDir())
}
