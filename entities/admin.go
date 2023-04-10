package entities

type Admin struct {
	Username  string `json:"username" db:"username"`
	FirstName string `json:"firstName" db:"firstName"`
	LastName  string `json:"lastName" db:"lastName"`
	Password  string `json:"password" db:"password"`
}
