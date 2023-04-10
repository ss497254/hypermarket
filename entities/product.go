package entities

type Product struct {
	Id        string `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	Quantity  string `json:"quantity" db:"quantity"`
	Price     string `json:"price" db:"price"`
	CreatedAt string `json:"createdAt" db:"createdAt"`
	UpdatedAt string `json:"updatedAt" db:"updatedAt"`
}
