import { Request } from 'express';

// Interface for the user payload in JWT tokens
export interface UserPayload {
    id: string;
    username: string;
}

// Extended Request interface that includes user information after authentication
export interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}
