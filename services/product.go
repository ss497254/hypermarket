package services

import (
	"hypermarket/daos"
	"hypermarket/entities"
)

func CreateProduct(product *entities.Product) error {
	return daos.CreateProduct(product)
}

func GetProducts() (*[]entities.Product, error) {
	return daos.GetProducts()
}

func GetProductById(id int) (*entities.Product, error) {
	return daos.GetProductById(id)
}

func UpdateProductById(product *entities.Product) error {
	return nil
}

func DeleteProductById(id string) error {
	return nil
}
