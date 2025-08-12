import ForbiddenError from '../errors/ForbiddenError';
import { 
    Request, 
    Response, 
    NextFunction 
} from 'express';

import tankService from '../services/tanks'

async function checkTankOwnership(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser = req.user;
    const tanks = await tankService.getAllTanksForUser(authenticatedUser!.id);
    if (!tanks.some(tank => tank.id === req.params.tankId)) {
        throw new ForbiddenError()
    }
    next()
};

export default checkTankOwnership