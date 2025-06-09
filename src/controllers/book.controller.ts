import { Request, Response } from 'express';
import { Book } from '../models/book.model.js';
import { IBook } from '../types/book.types.js';

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books: IBook[] = await Book.find();

        res.status(200).json({
            message: 'Success',
            books: books,
        });
    } catch (error) {
        console.error(`Error fetching books ${error}`);

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const addBook = async (
    req: Request<{}, {}, IBook>,
    res: Response
): Promise<void> => {
    try {
        const newBook: IBook = new Book(req.body);

        await newBook.save();

        res.status(201).json({
            message: 'Book created',
            book: newBook,
        });
    } catch (error) {
        console.error(`Error creating book: ${error}`);

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const updateBook = async (
    req: Request<{ id: string }, {}, Partial<IBook>>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const data = await Book.updateOne({ _id: id }, req.body);

        if (data.modifiedCount === 0) {
            res.status(404).json({
               message: 'Book not found!'
            })
            return;
        }

        res.status(200).json({
            message: 'Book updated',
            body: req.params,
            data: data,
        });
    } catch (error) {
        console.error(`Error updating book: ${error}`);

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const deleteBook = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const data = await Book.deleteOne({ _id: id });

        if (data.deletedCount === 0) {
            res.status(404).json({
                message: 'Book not found!'
            });

            return;
        }

        res.status(200).json({
            message: 'Book removed',
            body: req.params,
            data: data,
        });
    } catch (error) {
        console.error(`Error deleting book: ${error}`);

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
