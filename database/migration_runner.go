package database

import (
	"context"
	"embed"
	"fmt"
	"sort"
	"strings"
)

func RunMigrations(ctx context.Context, source embed.FS) error {
	knownMigrations, err := source.ReadDir(".")
	if err != nil {
		return err
	}

	sort.Slice(knownMigrations, func(i, j int) bool {
		return knownMigrations[i].Name() < knownMigrations[j].Name()
	})

	for _, f := range knownMigrations {
		n := f.Name()

		fmt.Println(`Executing migration:`, n)

		mBytes, err := source.ReadFile(n)
		if err != nil {
			return err
		}

		recordStmt := fmt.Sprintf(`INSERT INTO %s (name) VALUES (%q);`, migrationsTableName, dropExtension(n))

		if err := ExecTrans(ctx, string(mBytes)+recordStmt); err != nil {
			return err
		}

	}

	return nil
}

func dropExtension(filename string) string {
	idx := strings.Index(filename, ".")
	if idx == -1 {
		return filename
	}

	return filename[:idx]
}
