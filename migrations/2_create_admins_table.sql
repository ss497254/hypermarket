CREATE TABLE IF NOT EXISTS admins(
    "username" varchar(32) PRIMARY KEY NOT NULL,
    "firstName" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL,
    "password" varchar(255) NOT NULL
);
