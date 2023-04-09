package entities

type Product struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	Quantity  string `json:"quantity"`
	Price     string `json:"price"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}
