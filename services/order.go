package services

import (
	"hypermarket/daos"
	"hypermarket/entities"
)

func CreateOrder(order *entities.Order) (int64, error) {
	return daos.CreateOrder(order)
}

func GetOrders() (*[]entities.Order, error) {
	return daos.GetOrders()
}

func GetOrderById(id int) (*entities.Order, error) {
	return daos.GetOrderById(id)
}

func GetOrdersByStaffUsername(staff_username string) (*[]entities.Order, error) {
	return daos.GetOrdersByStaffUsername(staff_username)
}

func UpdateOrderById(id int) error {
	return daos.UpdateOrderById(id)
}

func DeleteOrderById(id int) error {
	return daos.DeleteOrderById(id)
}
