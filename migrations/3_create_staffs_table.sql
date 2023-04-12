CREATE TABLE IF NOT EXISTS staffs(
    "username" varchar(32) PRIMARY KEY NOT NULL,
    "firstName" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL,
    "password" varchar(255) NOT NULL,
    "mobile" integer(11),
    "address" text
);