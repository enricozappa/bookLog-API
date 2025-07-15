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

        // check if an account is already existing (limit of 1 account)
        const existingUser = await User.findOne({});
        if (existingUser) {
            res.status(400).json({ message: 'You can only have one account' });
            return;
        }

        // hash password
        user.password = await bcrypt.hash(req.body.password, saltRounds);

        const dbUser = new User({
            username: user.username.trim().toLowerCase(),
            password: user.password
        }) as IUser;

        dbUser.save();

        // Register user
        res.status(201).json({
            message: 'User created',
        });
    } catch (error) {
        console.error(`Error fetching books ${error}`);

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).json({
                message: 'Username and password are required'
            });
            return;
        }

        const dbUser = await User.findOne({ username: req.body.username });

        if (!dbUser) {
            res.status(400).json({
                message: 'Username not found'
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
