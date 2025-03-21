import mongoose from 'mongoose';
import { IUser } from '../types/user.types.js';

const { Schema } = mongoose;
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
