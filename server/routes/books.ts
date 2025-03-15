import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'

const fakeBooks: Book[] = [
  {
    id: 1,
    name: 'Belajar TypeScript',
    category: 'Pemrograman',
    publisher: 'Penerbit A',
    isbn: '1234567890123',
    issn: '1234-5678',
    author: 'John Doe',
    year: 2023,
    price: 150000,
    description: 'Buku ini membahas dasar-dasar TypeScript.',
  },
  {
    id: 2,
    name: 'ReactJS untuk Pemula',
    category: 'Pemrograman',
    publisher: 'Penerbit B',
    isbn: '9876543210987',
    issn: '8765-4321',
    author: 'Jane Smith',
    year: 2022,
    price: 200000,
    description: 'Panduan lengkap untuk memulai belajar ReactJS.',
  },
  {
    id: 3,
    name: 'Node.js Advanced',
    category: 'Pemrograman',
    publisher: 'Penerbit C',
    isbn: '4567890123456',
    issn: '5678-1234',
    author: 'Alice Johnson',
    year: 2021,
    price: 250000,
    description: 'Buku ini membahas konsep lanjutan Node.js.',
  },
];

export const bookSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(1, 'Nama buku harus diisi'),
  category: z.string().min(1, 'Kategori harus diisi'),
  publisher: z.string().min(1, 'Penerbit harus diisi'),
  isbn: z.string().length(13, 'ISBN harus 13 digit'),
  issn: z.string().length(9, 'ISSN harus 9 digit'),
  author: z.string().min(1, 'Pembuat harus diisi'),
  year: z.number().int().min(1900, 'Tahun tidak valid'),
  price: z.number().min(0, 'Harga tidak valid'),
  description: z.string().optional(),
});

type Book = z.infer<typeof bookSchema>

const addNewBookSchema = bookSchema.omit({ id: true })

export const updateBookSchema = addNewBookSchema.partial();

export const booksRoute = new Hono()
  .get('/', (c) => {
    return c.json({ books: fakeBooks }, 200)
  })
  .post('/', zValidator("json", addNewBookSchema), async (c) => {

    try {
      const book = await c.req.valid("json")
      fakeBooks.push({ ...book, id: fakeBooks.length + 1 })
      return c.json(book, 201)

    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ error: error.issues[0].message }, 400);
      }

      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .put('/:id{[0-9]+}', zValidator('json', updateBookSchema), async (c) => {
    const id = parseInt(c.req.param('id'))
    const updateBook = await c.req.valid('json')

    const bookIndex = fakeBooks.findIndex((book) => book.id === id);
    if (!bookIndex) {
      return c.json({ message: "Buku tidak ditemukan" }, 404)
    }

    if (bookIndex === -1) {
      return c.json({ error: 'Buku tidak ditemukan' }, 404);
    }

    fakeBooks[bookIndex] = { ...fakeBooks[bookIndex], ...updateBook };

    return c.json({ book: fakeBooks[bookIndex] }, 200);

  })
  .delete('/:id', async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    if (isNaN(id)) {
      return c.json({ error: 'ID tidak valid' }, 400);
    }

    const bookIndex = fakeBooks.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return c.json({ error: 'Buku tidak ditemukan' }, 404);
    }

    fakeBooks.splice(bookIndex, 1);

    return c.json({ message: "Buku berhasil di hapus" });
  });