import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model.js';

export const allowRegistrationOnlyIfNoUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Check if any user exists in the database
        const userCount = await User.countDocuments();

        if (userCount > 0) {
            res.status(403).json({
                message: 'Registration is disabled. An account already exists.'
            });
            return;
        }

        // If no users exist, allow registration to proceed
        next();
    } catch (error) {
        console.error('Error checking user count:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}; 