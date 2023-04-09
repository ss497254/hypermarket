CREATE TABLE products(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" varchar(255),
    "price" INTEGER not null,
    "quantity" INTEGER not null,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);