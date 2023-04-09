package entities

type User struct {
	Username  string `json:"username"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Mobile    uint64 `json:"mobile"`
	Address   string `json:"address"`
	Password  string `json:"-"`
}
