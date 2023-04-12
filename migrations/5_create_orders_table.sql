CREATE TABLE orders(
    "id" INTEGER AUTOINCREMENT,
    "staff_username" varchar(32) NOT NULL,
    "amount" INTEGER unsigned NOT NULL,
    "payment_method" varchar(255) NOT NULL,
    "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT orders_primary_key PRIMARY KEY (id, staff_username)
);