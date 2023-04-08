package database

import "go.mongodb.org/mongo-driver/mongo"

func GetCollection(collectionName string) *mongo.Collection {
	collection := MongoInstance.Db.Collection(collectionName)
	return collection
}
