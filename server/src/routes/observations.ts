import { Router } from 'express';
import { body, param } from 'express-validator';

import requireAuthentication from '../middlewares/requireAuthentication'
import { 
    deleteObservation,
    createBatchObservation
} from '../controllers/observations'

import handleValidationErrors from '../middlewares/handleValidationErrors'
import observationService from '../services/observations';

const observationIdValidation = [
    param("observationId")
        .trim()
        .notEmpty()
        .withMessage("Observation ID is required")
        .isUUID()
        .withMessage("Observation ID must be a valid UUID")
        .custom(async (observationId) => {
        try {
            await observationService.getObservation(observationId);
            return true;
        } catch {
            return Promise.reject("Observation ID must reference an existing User");
        }
        }),
]
const createBatchObservationsValidation = [
    body("recorded_at")
      .trim()
      .notEmpty()
      .withMessage("Date recorded is required")
      .isISO8601()
      .withMessage("Date recorded must be a valid ISO8601 date"),
    body("observations")
        .isArray({ min: 1 })
        .withMessage("At least one parameter value is required"),
    body("observations.*.value")
      .trim()
      .notEmpty()
      .withMessage('Value is required')
      .isFloat()
      .withMessage("Value must be a valid numerical value"),
    body('observations.*.parameter_id')
      .trim()
      .notEmpty()
      .withMessage('Parameter ID is required')
      .isUUID()
      .withMessage("Parameter ID must be a valid UUID")
]

const router = Router();

router.use(requireAuthentication);

router.delete(
    '/:observationId',
    observationIdValidation,
    handleValidationErrors,
    deleteObservation);

router.post(
    '/batch',
    createBatchObservationsValidation,
    handleValidationErrors,
    createBatchObservation);

export default router;
