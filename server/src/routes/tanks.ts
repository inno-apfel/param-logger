import {Router} from 'express';
import { body, param } from 'express-validator';

import {
  createTank,
  createTankObservation,
  createTankParameter,
  getAllTanksForUser,
  getTank,
  getTankObservations,
} from '../controllers/tanks';
import handleValidationErrors from '../middlewares/handleValidationErrors'
import requireAuthentication from '../middlewares/requireAuthentication'
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
    body("param_name")
      .trim()
      .isLength({ min: 1, max: 30 })
      .withMessage("Parameter name must be between 3-30 characters")
      .isAlphanumeric()
      .withMessage("Parameter name must be alphanumeric"),
    body("reference_value")
      .trim()
      .notEmpty()
      .withMessage('Reference value is required')
      .isFloat()
      .withMessage("Reference value must be a valid numerical value"),
    body("unit_of_measure")
      .trim()
      .isLength({ min: 1, max: 30 })
      .withMessage("Unit of measure name must be between 3-30 characters")
      .isAlphanumeric()
      .withMessage("Unit of measure na must be alphanumeric"),
    param('tankId')
      .trim()
      .notEmpty()
      .withMessage('Tank ID is required')
      .isUUID()
      .withMessage("Tank ID must be a valid UUID")
      // .custom(async (tankId) => {
      //       const tank = await tankService.getTank(tankId);
      //       if (!tank) {
      //           throw new Error('Tank not found');
      //       }
      //       return true;
      //   })
]

const createObservationValidation = [
    body("value")
      .trim()
      .notEmpty()
      .withMessage('Value is required')
      .isFloat()
      .withMessage("Value must be a valid numerical value"),
    body('param_id')
      .trim()
      .notEmpty()
      .withMessage('Parameter ID is required')
      .isUUID()
      .withMessage("Parameter ID must be a valid UUID")
]

router.use(requireAuthentication);

router.get('/:tankId/observations', getTankObservations);

router.post('/:tankId/observations', createObservationValidation, handleValidationErrors, createTankObservation);

router.post('/:tankId/parameters', createParameterValidation, handleValidationErrors, createTankParameter);

router.get('/:tankId', getTank);

router.get('/', getAllTanksForUser);

router.post('/', createTankValidation, handleValidationErrors, createTank);

export default router;
