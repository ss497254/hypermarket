package database

import (
	"context"
	"fmt"
	"sas/migrations"
	"sort"
	"strings"

	"github.com/fatih/color"
)

func RunMigrations() error {
	source := migrations.ALL
	color.Green("Running migrations.")

	knownMigrations, err := source.ReadDir(".")
	if err != nil {
		return err
	}

	lastMigration, err := LastMigration()
	if err != nil {
		color.Red("Unable to get last migration")
	}

	color.Yellow(`Skipping migrations upto "%s"`, lastMigration)

	sort.Slice(knownMigrations, func(i, j int) bool {
		return knownMigrations[i].Name() < knownMigrations[j].Name()
	})

	for _, f := range knownMigrations {
		migration := f.Name()
		migrationWithoutExt := dropExtension(migration)

		if migrationWithoutExt <= lastMigration {
			continue
		}

		color.Green(`Executing migration "%s"`, migrationWithoutExt)

		mBytes, err := source.ReadFile(migration)
		if err != nil {
			return err
		}

		recordStmt := fmt.Sprintf(`INSERT INTO %s (name) VALUES (%q);`, migrationsTableName, migrationWithoutExt)

		ctx := context.Background()
		if err := ExecTrans(ctx, string(mBytes)+recordStmt); err != nil {
			return err
		}

	}

	color.Green("Migrations ran successfully.")
	return nil
}

func dropExtension(filename string) string {
	idx := strings.Index(filename, ".")
	if idx == -1 {
		return filename
	}

	return filename[:idx]
}
