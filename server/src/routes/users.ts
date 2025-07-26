import {Router} from 'express';

import {
    createUser,
    getAllUsers, 
    getUser
} from '../controllers/users';

const router = Router();

router.get('/:userId', getUser); // unused

router.get('/', getAllUsers); // unused

router.post('/', createUser); // unused

export default router;
