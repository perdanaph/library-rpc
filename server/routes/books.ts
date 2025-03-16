import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'
import { db } from "../db";
import { books } from "../db/schema/books";
import { eq } from 'drizzle-orm';

export const bookSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(1, 'Nama buku harus diisi'),
  category: z.string().min(1, 'Kategori harus diisi'),
  publisher: z.string().min(1, 'Penerbit harus diisi'),
  isbn: z.string().min(5, 'ISBN harus 5 digit minimal'),
  issn: z.string().min(5, 'ISSN harus 5 digit minimal'),
  author: z.string().min(1, 'Pembuat harus diisi'),
  year: z.string().min(4, 'Tahun tidak valid'),
  price: z.string().min(0, 'Harga tidak valid'),
  description: z.string().optional(),
});

type Book = z.infer<typeof bookSchema>

const addNewBookSchema = bookSchema.omit({ id: true })

export const updateBookSchema = addNewBookSchema.partial();

export const booksRoute = new Hono()
  .get('/', async (c) => {
    const data = await db.select().from(books);
    return c.json({ books: data }, 200)
  })
  .get('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const book = await db.select().from(books).where(eq(books.id, id))
    if (!book) {
      return c.json({ message: "Buku tidak ditemukan" }, 404)
    }
    return c.json({ book });
  })
  .post('/', zValidator("json", addNewBookSchema), async (c) => {
    try {
      const book = await c.req.valid("json")
      console.log(book)
      const result = await db.insert(books).values({
        ...book,
      }).returning().then((res) => res[0]);
      console.log("first")
      return c.json(result, 201)

    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ error: error.issues[0].message }, 400);
      }

      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .put('/:id{[0-9]+}', zValidator('json', updateBookSchema), async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const updateBook = await c.req.valid('json')

    const book = await db.select().from(books).where(eq(books.id, id))
    if (!book) {
      return c.json({ message: "Buku tidak ditemukan" }, 404)
    }

    const result = await db.update(books).set({
      name: updateBook.name,
      category: updateBook.category,
      publisher: updateBook.publisher,
      isbn: updateBook.isbn,
      issn: updateBook.issn,
      author: updateBook.author,
      year: updateBook.year,
      price: updateBook.price,
      description: updateBook.description
    }).where(eq(books.id, id)).returning()

    return c.json({ book: result }, 200);

  })
  .delete('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    if (isNaN(id)) {
      return c.json({ error: 'ID tidak valid' }, 400);
    }

    const book = await db.delete(books).where(eq(books.id, id));

    if (!book) {
      return c.json({ error: 'Buku tidak ditemukan' }, 404);
    }

    return c.json({ message: "Buku berhasil di hapus" });
  });