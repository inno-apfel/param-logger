import { 
    Request, 
    Response, 
    NextFunction 
} from 'express';

import BadUsernamePasswordError from '../errors/BadUsernamePasswordError'
import ForbiddenError from '../errors/ForbiddenError'
import NotFoundError from '../errors/NotFoundError';
import NotAuthenticatedError from '../errors/NotAuthenticatedError';
import ValidationError from '../errors/ValidationError';

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log the full error for debugging (but don't send to client)
    console.error('Unexpected error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body,
        params: req.params,
        timestamp: new Date().toISOString()
    });
    // Handle custom errors
    if (err instanceof NotFoundError || 
        err instanceof NotAuthenticatedError ||
        err instanceof ValidationError ||
        err instanceof BadUsernamePasswordError ||
        err instanceof ForbiddenError) {
        res.status(err.statusCode).json({
            messages: err.messages,
            timestamp: new Date().toISOString()
        });
    }
    // Else send generic error response to frontend
    if (!res.headersSent) {
        res.status(500).json({
            messages: ['Something went wrong on our end. Please try again.'],
            timestamp: new Date().toISOString()
        });
    }
};

export default globalErrorHandler;