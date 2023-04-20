package daos

import (
	"hypermarket/database"
	"hypermarket/entities"
)

func CreateProduct(product *entities.Product) (int64, error) {
	res, err := database.DB.Exec("insert into products(name, price, quantity) values($1, $2, $3)", product.Name, product.Price, product.Quantity)

	if err != nil {
		return 0, err
	}

	return res.LastInsertId()
}

func GetProducts() (*[]entities.Product, error) {
	rows, err := database.Query("select * from products")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products = []entities.Product{}

	for rows.Next() {
		var product = entities.Product{}

		err := rows.StructScan(&product)
		if err != nil {
			return nil, err
		}

		products = append(products, product)
	}

	return &products, nil
}

func GetProductById(id int) (*entities.Product, error) {
	row := database.QueryRow("select * from products where id=$1", id)

	var product = entities.Product{}

	err := row.StructScan(&product)
	if err != nil {
		return nil, err
	}

	return &product, nil
}

func UpdateProduct(product *entities.Product) error {
	_, err := database.DB.Exec("update products set name = $1, price = $2, quantity = $3 where id = $4", product.Name, product.Price, product.Quantity, product.Id)

	return err
}

func DeleteProductById(id int) error {
	return nil
}
