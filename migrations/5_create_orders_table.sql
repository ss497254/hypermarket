CREATE TABLE IF NOT EXISTS orders(
    "id" INTEGER AUTO INCREMENT,
    "staff_username" varchar(32) NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_method" varchar(255) NOT NULL,
    "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT orders_primary_key PRIMARY KEY (id, staff_username)
);