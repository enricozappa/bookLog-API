import { Request, Response } from "express";
import { Book } from "../models/book.model.js";

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            message: 'Success',
            books: books
        });
    } catch (error) {
        console.error(`Error fetching books ${error}`);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export const addBook = async (req: Request, res: Response) => {
    try {
        const newBook = new Book(req.body);

        await newBook.save();

        res.status(200).json({
            message: 'Book created',
            book: newBook
        });
    } catch (error) {
        console.error(`Error creating book: ${error}`);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// const testBook = new Book({
//     isbn: '978880000000',
//     title: 'Test book 2',
//     author: 'Pippo Pluto',
//     imgUrl: 'https://www.google.it',
//     progress: 0
// });

// const createTestBook = () => {
//     testBook.save()
//         .then(doc => {
//             console.log(doc)
//         })
//         .catch(err => console.error(err));
// }

// export default createTestBook;