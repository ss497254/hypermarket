package services

import (
	"hypermarket/daos"
	"hypermarket/entities"
)

func CreateProduct(product *entities.Product) (int64, error) {
	return daos.CreateProduct(product)
}

func GetProducts() (*[]entities.Product, error) {
	return daos.GetProducts()
}

func GetProductById(id int) (*entities.Product, error) {
	return daos.GetProductById(id)
}

func UpdateProduct(product *entities.Product) error {
	return daos.UpdateProduct(product)
}

func DeleteProductById(id int) error {
	return daos.DeleteProductById(id)
}
