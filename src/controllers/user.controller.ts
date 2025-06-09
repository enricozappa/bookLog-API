import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { IUser } from '../types/user.types.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const register = async (
    req: Request<{}, {}, IUser>,
    res: Response
): Promise<void> => {
    try {
        const user = req.body;
        const saltRounds = 10;

        // check if username or email has been taken
        const takenUsername = await User.findOne({ username: user.username });
        const takenEmail = await User.findOne({ email: user.email });

        if (takenUsername || takenEmail) {
            res.json({ message: 'Username or email has already been taken' });
        } else {
            user.password = await bcrypt.hash(req.body.password, saltRounds);

            const dbUser = new User({
                username: user.username.trim().toLowerCase(),
                email: user.email.trim().toLowerCase(),
                password: user.password
            }) as IUser;

            dbUser.save();

            // Register user
            res.status(201).json({
                message: 'User created',
            });
        }
    } catch (error) {
        console.error(`Error fetching books ${error}`);

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            res.status(400).json({
                message: 'Email and password are required'
            });
            return;
        }

        const dbUser = await User.findOne({ email: req.body.email });

        if (!dbUser) {
            res.status(400).json({
                message: 'User not found'
            });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, dbUser.password);

        if (!isPasswordCorrect) {
            res.status(400).json({
                message: 'Invalid password'
            });
            return;
        }

        const payload = {
            id: dbUser._id,
            username: dbUser.username
        }

        const token = await new Promise<string>((resolve, reject) => {
            jsonwebtoken.sign(
                payload,
                process.env.JWT_SECRET as string,
                { expiresIn: 86400 },
                (err, token) => {
                    if (err) reject(err);
                    else resolve(token as string);
                }
            );
        });

        res.status(200).json({
            message: 'Success',
            token: `Bearer ${token}`
        });
    } catch (error) {
        console.error(`Error during login: ${error}`);

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
