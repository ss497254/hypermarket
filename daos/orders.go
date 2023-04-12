package daos

import (
	"hypermarket/database"
	"hypermarket/entities"
)

func CreateOrder(order *entities.Order) error {
	_, err := database.DB.Exec("insert into orders(staff_username, amount, payment_method) values($1, $2, $3)", order.Staff_username, order.Amount, order.Payment_method)

	return err
}

func GetOrders() (*[]entities.Order, error) {
	rows, err := database.Query("select * from orders")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orders = []entities.Order{}

	for rows.Next() {
		var order = entities.Order{}

		err := rows.StructScan(&order)
		if err != nil {
			return nil, err
		}

		orders = append(orders, order)
	}

	return &orders, nil
}

func GetOrderById(id int) (*entities.Order, error) {
	row := database.QueryRow("select * from orders where id=$1", id)

	var order = entities.Order{}

	err := row.StructScan(&order)
	if err != nil {
		return nil, err
	}

	return &order, nil
}

func GetOrdersByStaffUsername(staff_username string) (*entities.Order, error) {
	row := database.QueryRow("select * from orders where staff_username=$1", staff_username)

	var order = entities.Order{}

	err := row.StructScan(&order)
	if err != nil {
		return nil, err
	}

	return &order, nil
}

func UpdateOrderById(id int) error {
	return nil
}

func DeleteOrderById(id int) error {
	return nil
}
