import express, { Application } from 'express';
import morgan from 'morgan';
import { getBooks, addBook, updateBook, deleteBook } from './controllers/book.controller.js';

const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/books', getBooks);
app.post('/api/books', addBook);
app.patch('/api/books/:id', updateBook);
app.delete('/api/books/:id', deleteBook);

export default app;
