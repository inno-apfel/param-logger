import {Router} from 'express';
import { body, param } from 'express-validator';

import {
  createTank,
  createTankObservation,
  createTankParameter,
  getAllTanksForUser,
  getTank,
  getTankObservations,
  getTankParameters,
} from '../controllers/tanks';
import handleValidationErrors from '../middlewares/handleValidationErrors'
import tankService from '../services/tanks';

const router = Router();

const createTankValidation = [
    body("tank_name")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Tank name must be between 3-30 characters")
      .isAlphanumeric()
      .withMessage("Tank name must be alphanumeric")
]

const createParameterValidation = [
    body("tank_name")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Tank name must be between 3-30 characters")
      .isAlphanumeric()
      .withMessage("Tank name must be alphanumeric"),
    param('tankId')
      .trim()
      .notEmpty()
      .withMessage('Tank ID is required')
      .isUUID()
      .withMessage("Tank ID must be a valid UUID")
      .custom(async (tankId) => {
            const tank = await tankService.getTank(tankId);
            if (!tank) {
                throw new Error('Tank not found');
            }
            return true;
        })
]

const createObservationValidation = [
    body("value")
      .trim()
      .isFloat()
      .withMessage("Value must be a valid numerical value"),
    body('param_id')
      .trim()
      .isFloat()
      .toFloat()
      .withMessage("Value must be a valid numerical value")
]

router.get('/:tankId/observations', getTankObservations);

router.post('/:tankId/observations', createObservationValidation, handleValidationErrors, createTankObservation);

router.get('/:tankId/parameters', getTankParameters); // unused

router.post('/:tankId/parameters', createParameterValidation, handleValidationErrors, createTankParameter);

router.get('/:tankId', getTank);

router.get('/', getAllTanksForUser);

router.post('/', createTankValidation, handleValidationErrors, createTank);

export default router;
