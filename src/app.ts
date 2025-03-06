import express from 'express';
import morgan from 'morgan';
import { getBooks } from './controllers/books.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/books', getBooks);

export default app;
