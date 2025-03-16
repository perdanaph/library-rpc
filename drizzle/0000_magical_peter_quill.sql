CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"publisher" varchar(100) NOT NULL,
	"isbn" varchar(13) NOT NULL,
	"issn" varchar(9) NOT NULL,
	"author" varchar(100) NOT NULL,
	"year" numeric NOT NULL,
	"price" numeric NOT NULL,
	"description" text
);
