import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from "hono/bun";
import { booksRoute } from './routes/books';

const app = new Hono()

app.use("*", logger());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/books", booksRoute)

export default app
