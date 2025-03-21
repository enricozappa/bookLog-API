import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { IUser } from '../types/user.types.js';
import bcrypt from 'bcrypt';

export const registerUser = async (
    req: Request<{}, {}, IUser>,
    res: Response
): Promise<void> => {
    try {
        const user = req.body;

        // check if username or email has been taken
        const takenUsername = await User.findOne({ username: user.username });
        const takenEmail = await User.findOne({ email: user.email });

        if (takenUsername || takenEmail) {
            res.json({ message: 'Username or email has already been taken' });
        } else {
            user.password = await bcrypt.hash(req.body.password, 10);

            const dbUser = new User({
                username: user.username.trim().toLowerCase(),
                email: user.email.trim().toLowerCase(),
                password: user.password
            }) as IUser;

            dbUser.save();

            // Register user
            res.status(201).json({
                message: 'Success',
            });
        }
    } catch (error) {
        console.error(`Error fetching books ${error}`);

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
