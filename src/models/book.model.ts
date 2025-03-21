import mongoose from 'mongoose';
import { IBook } from '../types/book.types.js';

const { Schema } = mongoose;
const bookSchema = new Schema<IBook>({
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imgUrl: String,
    progress: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Book = mongoose.model<IBook>('Book', bookSchema);
