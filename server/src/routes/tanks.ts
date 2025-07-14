import { Router } from 'express';
import { 
    createTank, 
    getTank, 
    getTankParameters, 
    createTankParameter, 
    getTankObservations, 
    createTankObservation 
} from '../controllers/tanks'

const router = Router();

router.get('/:tankId/observations', getTankObservations)

router.post('/:tankId/observations', createTankObservation)

router.get('/:tankId/parameters', getTankParameters)

router.post('/:tankId/parameters', createTankParameter)

router.get('/:tankId', getTank)

router.post('/', createTank) 

export default router