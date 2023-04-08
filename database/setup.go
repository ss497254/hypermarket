package database

import (
	"context"
	"fmt"
	"log"
	"server/config"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type mg struct {
	Client *mongo.Client
	Db     *mongo.Database
}

var MongoInstance *mg

func ConnectDB() {
	db_url := fmt.Sprintf(
		"mongodb+srv://%s:%s@%s.%s/?retryWrites=true&w=majority",
		config.Config.DB_USERNAME,
		config.Config.DB_PASSWORD,
		config.Config.DB_CLUSTER,
		config.Config.DB_HOST,
	)

	client, err := mongo.NewClient(options.Client().ApplyURI(db_url))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")

	MongoInstance = &mg{
		Client: client,
		Db:     client.Database(config.Config.DB_NAME),
	}
}

func Close() {
	if err := MongoInstance.Client.Disconnect(context.Background()); err != nil {
		log.Println(err)
	}
}
