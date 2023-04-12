package database

import (
	"context"
	"hypermarket/config"
	"log"
	"sync"

	_ "modernc.org/sqlite"

	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB
var mu sync.RWMutex

const migrationsTableName = "migrations"

func ConnectDB() {
	conf := config.GetConfig()

	db, err := sqlx.Connect("sqlite", conf.DB_PATH)
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
	mu.RLock()
}

func RUnlockSqlStore() {
	mu.RUnlock()
}

func ExecTrans(ctx context.Context, stmt string) error {

	mu.Lock()
	defer mu.Unlock()

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
