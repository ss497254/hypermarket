package database

import (
	"context"
	"fmt"
	"log"
	"sas/config"
	"sync"

	_ "modernc.org/sqlite"

	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB
var Mu sync.RWMutex

const migrationsTableName = "migrations"

func ConnectDB() {
	conf := config.GetConfig()

	db, err := sqlx.Open("sqlite", conf.DB_PATH)
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

func RLockSqlStore() {
	Mu.RLock()
}

func RUnlockSqlStore() {
	Mu.RUnlock()
}

func ExecTrans(ctx context.Context, stmt string) error {

	Mu.Lock()
	defer Mu.Unlock()

	tx, err := DB.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	_, err = tx.ExecContext(ctx, stmt)
	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}

func AllMigrationNames() ([]string, error) {
	checkStmt := fmt.Sprintf(`SELECT name FROM sqlite_master WHERE type='table' AND name='%s'`, migrationsTableName)

	tbls, err := Query(checkStmt)
	if err != nil {
		return nil, err
	}

	if len(tbls) == 0 {
		return nil, nil
	}

	migrStmt := fmt.Sprintf(`SELECT name FROM %s ORDER BY name`, migrationsTableName)
	migr, err := Query(migrStmt)
	if err != nil {
		return nil, err
	}

	if len(migr) == 0 {
		return nil, nil
	}

	return migr, nil
}

func TableNames() ([]string, error) {
	stmt := `SELECT name FROM sqlite_master WHERE type='table'`
	return Query(stmt)
}
