import express, { Application } from 'express';
import morgan from 'morgan';
import { getBooks, addBook, updateBook, deleteBook } from './controllers/book.controller.js';

const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/books', getBooks);
app.post('/books', addBook);
app.patch('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

export default app;
