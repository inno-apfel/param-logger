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
      .isAlphanumeric('en-US', { ignore: ' -_' })
      .withMessage("Tank name must be alphanumeric")
]

const createParameterValidation = [
    body("param_name")
      .trim()
      .isLength({ min: 1, max: 30 })
      .withMessage("Parameter name must be between 3-30 characters")
      .isAlphanumeric('en-US', { ignore: ' -_' })
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
      .isAlphanumeric('en-US', { ignore: ' -_' })
      .withMessage("Unit of measure na must be alphanumeric"),
    param('tankId')
      .trim()
      .notEmpty()
      .withMessage('Tank ID is required')
      .isUUID()
      .withMessage("Tank ID must be a valid UUID")
      .custom(async (tankId) => {
            const tank = await tankService.getTank(tankId);
            if (!tank) {
                return Promise.reject();
            }
            return true;
        })
      .withMessage("Tank ID must reference an existing tank")
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

/**
 * @openapi
 * /tanks/{tankId}/observations:
 *   get:
 *     tags:
 *       - Tanks
 *     summary: Get all observations for a tank grouped by parameter
 *     parameters:
 *       - $ref: '#/components/parameters/TankIdParam'
 *     responses:
 *      200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParameterWithObservations'
 *      401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:tankId/observations', getTankObservations);

/**
 * @openapi
 * /tanks/{tankId}/observations:
 *   post:
 *     tags:
 *       - Tanks
 *     summary: Create a new observation
 *     parameters:
 *       - $ref: '#/components/parameters/TankIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateObservationInput'
 *     responses:
 *      201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateObservationResponse'
 *      400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/:tankId/observations', createObservationValidation, handleValidationErrors, createTankObservation);

/**
 * @openapi
 * /tanks/{tankId}/parameters:
 *   post:
 *     tags:
 *       - Tanks
 *     summary: Create a new parameter
 *     parameters:
 *       - $ref: '#/components/parameters/TankIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateParameterInput'
 *     responses:
 *      201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateParameterResponse'
 *      400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/:tankId/parameters', createParameterValidation, handleValidationErrors, createTankParameter);

/**
 * @openapi
 * /tanks/{tankId}:
 *   get:
 *     tags:
 *       - Tanks
 *     summary: Get a specific tank
 *     parameters:
 *       - $ref: '#/components/parameters/TankIdParam'
 *     responses:
 *      200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Tank'
 *      401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:tankId', getTank);

/**
 * @openapi
 * /tanks:
 *   get:
 *     tags:
 *       - Tanks
 *     summary: Get all of the user's tanks
 *     parameters:
 *       - $ref: '#/components/parameters/TankIdParam'
 *     responses:
 *      200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Tank'
 *      401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAllTanksForUser);

/**
 * @openapi
 * /tanks:
 *   post:
 *     tags:
 *       - Tanks
 *     summary: Create a new tank
 *     parameters:
 *       - $ref: '#/components/parameters/TankIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTankInput'
 *     responses:
 *      201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tank'
 *      400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createTankValidation, handleValidationErrors, createTank);

export default router;
