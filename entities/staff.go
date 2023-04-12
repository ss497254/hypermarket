package entities

type Staff struct {
	Username  string `json:"username" db:"username"`
	FirstName string `json:"firstName" db:"firstName"`
	LastName  string `json:"lastName" db:"lastName"`
	Mobile    int64  `json:"mobile" db:"mobile"`
	Address   string `json:"address" db:"address"`
	Password  string `json:"password" db:"password"`
}
