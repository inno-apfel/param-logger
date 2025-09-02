import { Router } from 'express';
import { param } from 'express-validator';

import requireAuthentication from '../middlewares/requireAuthentication'
import { 
    deleteObservation
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

const router = Router();

router.use(requireAuthentication);

router.delete(
    '/:observationId',
    observationIdValidation,
    handleValidationErrors,
    deleteObservation);

export default router;
