import ForbiddenError from '../errors/ForbiddenError';
import { 
    Request, 
    Response, 
    NextFunction 
} from 'express';

async function isCurrentUser(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser = req.user;
    if (authenticatedUser?.id !== req.params.userId) {
        throw new ForbiddenError()
    }
    next()
};

export default isCurrentUser