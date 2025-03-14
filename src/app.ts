import express from 'express';
import morgan from 'morgan';
import { getBooks, addBook } from './controllers/book.controller.js';
// import createTestBook from './models/book.model.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/books', getBooks);
app.post('/books', addBook);

// createTestBook();

export default app;
