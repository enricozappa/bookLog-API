import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { getBooks, addBook, updateBook, deleteBook } from './controllers/book.controller.js';
import { registerUser } from './controllers/user.controller.js';

const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.get('/api/books', getBooks);
app.post('/api/books', addBook);
app.patch('/api/books/:id', updateBook);
app.delete('/api/books/:id', deleteBook);

app.post('/api/register', registerUser)

export default app;
