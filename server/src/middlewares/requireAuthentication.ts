import NotAuthenticatedError from '../errors/NotAuthenticatedError';
import { 
    Request, 
    Response, 
    NextFunction 
} from 'express';

function requireAuthentication(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser = req.user;
    if (!authenticatedUser) {
        throw new NotAuthenticatedError()
    }
    next()
};

export default requireAuthentication