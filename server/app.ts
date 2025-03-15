import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from "hono/bun";
import { booksRoute } from './routes/books';

const app = new Hono()

app.use("*", logger());


const apiRoutes = app.basePath('/api').route("/books", booksRoute);

app.use('*', serveStatic({ root: './frontend/dist' }));
app.use('*', serveStatic({ root: './frontend/dist/index.html' }));

export default app
export type ApiRoutes = typeof apiRoutes