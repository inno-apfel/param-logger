import { Router } from 'express';
import { 
    createUser,
    getUser,
    getAllUsers
} from '../controllers/users'

const router = Router();

router.get('/:userId', getUser)

router.get('/', getAllUsers)

router.post('/', createUser)

export default router