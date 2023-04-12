package entities

type Order struct {
	Id             string `json:"id" db:"id"`
	Staff_username string `json:"staff_username" db:"staff_username"`
	Amount         int    `json:"amount" db:"amount"`
	Payment_method string `json:"payment_method" db:"payment_method"`
	Date           string `json:"date" db:"date"`
}
