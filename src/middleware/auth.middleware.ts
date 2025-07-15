import { Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { AuthenticatedRequest, UserPayload } from '../types/auth.types.js';

export const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get the authorization header from the request
        const authHeader = req.headers['authorization'];
        
        // Extract the token from the "Bearer <token>" format
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        // If no token is provided, return 401 Unauthorized
        if (!token) {
            res.status(401).json({
                message: 'Access token required'
            });
            return;
        }

        // Verify the token using the JWT_SECRET
        const decoded = await new Promise<UserPayload>((resolve, reject) => {
            jsonwebtoken.verify(
                token,
                process.env.JWT_SECRET as string,
                (err, decoded) => {
                    if (err) reject(err);
                    else resolve(decoded as UserPayload);
                }
            );
        });

        // Add the user information to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        
        res.status(403).json({
            message: 'Invalid or expired token'
        });
    }
}; 