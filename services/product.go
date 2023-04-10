package services

import (
	"fmt"
	"sas/daos"
	"sas/entities"
)

func GetProducts() (*[]entities.Product, error) {
	product, err := daos.GetProducts()

	if err != nil {
		return nil, fmt.Errorf("unable to find product, %s", err.Error())
	}

	return product, nil
}

func GetProductById(id uint32) (*entities.Product, error) {
	product, err := daos.GetProductById(id)

	if err != nil {
		return nil, fmt.Errorf("unable to find product, %s", err.Error())
	}

	return product, nil
}

func UpdateProductById(product *entities.Product) error {
	return nil
}

func DeleteProductById(id string) error {
	return nil
}
