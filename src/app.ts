import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { getBooks, addBook, updateBook, deleteBook } from './controllers/book.controller.js';
import { register, login } from './controllers/user.controller.js';
import { authenticateToken } from './middleware/auth.middleware.js';
import { allowRegistrationOnlyIfNoUsers } from './middleware/register.middleware.js';

const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.get('/api/books', getBooks);
app.post('/api/books', authenticateToken, addBook);
app.patch('/api/books/:id', authenticateToken, updateBook);
app.delete('/api/books/:id', authenticateToken, deleteBook);

app.post('/api/register', allowRegistrationOnlyIfNoUsers, register);
app.post('/api/login', login);

export default app;
