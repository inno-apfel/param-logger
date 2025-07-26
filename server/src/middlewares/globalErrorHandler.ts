import { 
    Request, 
    Response, 
    NextFunction 
} from 'express';

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

    // Send generic error response to frontend
    if (!res.headersSent) {
        res.status(500).json({
            error: 'Something went wrong on our end. Please try again.',
            code: 'INTERNAL_SERVER_ERROR',
            timestamp: new Date().toISOString()
        });
    }
};

export default globalErrorHandler;