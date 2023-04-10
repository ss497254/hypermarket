CREATE TABLE staffs(
    "username" varchar(32) primary key not null,
    "firstName" varchar(64) not null,
    "lastName" varchar(64) not null,
    "password" varchar(255) not null,
    "mobile" integer,
    "address" text
);