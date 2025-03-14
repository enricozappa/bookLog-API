import { Document } from "mongoose";

export interface IBook extends Document {
    isbn: string;
    title: string,
    author: string,
    imgUrl?: string | null,
    progress: number
}
