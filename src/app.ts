import express, { Application } from 'express';
import morgan from 'morgan';
import { getBooks, addBook } from './controllers/book.controller.js';

const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/books', getBooks);
app.post('/books', addBook);

export default app;
