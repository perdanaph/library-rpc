import { numeric, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  publisher: varchar('publisher', { length: 100 }).notNull(),
  isbn: varchar('isbn', { length: 13 }).notNull(),
  issn: varchar('issn', { length: 9 }).notNull(),
  author: varchar('author', { length: 100 }).notNull(),
  year: numeric('year').notNull(),
  price: numeric('price').notNull(),
  description: text('description'),
});

export const schema = {
  book: books
}