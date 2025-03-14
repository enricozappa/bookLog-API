import mongoose from 'mongoose';

const { Schema } = mongoose;
const bookSchema = new Schema({
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
});

export const Book = mongoose.model('Book', bookSchema);
