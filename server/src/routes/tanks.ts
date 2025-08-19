import {NextFunction, Router} from 'express';
import { body, param } from 'express-validator';

import {
  createTank,
  createTankObservation,
  createTankParameter,
  createTankTask,
  getAllTanksForUser,
  getTank,
  getTankObservations,
  getTankTasks,
  updateTankTasks,
  deleteTankTask,
  getTankJournal,
  upsertTankJournal
} from '../controllers/tanks';
import handleValidationErrors from '../middlewares/handleValidationErrors'
import checkTankOwnership from '../middlewares/checkTankOwnership'
import requireAuthentication from '../middlewares/requireAuthentication'
import tankService from '../services/tanks';
import parameterService from '../services/parameters';

const router = Router();

const createTankValidation = [
    body("tank_name")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Tank name must be between 3-30 characters")
      .isAlphanumeric('en-US', { ignore: ' -_' })
      .withMessage("Tank name must be alphanumeric"),
    body("gallons")
      .trim()
      .notEmpty()
      .withMessage("Tank volume is required")
      .isFloat()
      .withMessage("Gallons must be a positive number"),
    body("setup_date")
      .trim()
      .notEmpty()
      .withMessage("Setup date is required")
      .isISO8601()
      .withMessage("Setup date must be a valid date in YYYY-MM-DD format")
]

const createParameterValidation = [
    param('tankId')
      .trim()
      .notEmpty()
      .withMessage('Tank ID is required')
      .isUUID()
      .withMessage("Tank ID must be a valid UUID")
      .custom(async (tankId) => {
          try{
            await tankService.getTank(tankId);
            return true;
          }
          catch{
            
            return Promise.reject();
          }
        })
      .withMessage("Tank ID must reference an existing tank"),
    body("param_name")
      .trim()
      .isLength({ min: 1, max: 30 })
      .withMessage("Parameter name must be between 3-30 characters")
      .isAlphanumeric('en-US', { ignore: ' -_' })
      .withMessage("Parameter name must be alphanumeric")
      .custom(async (param_name, { req }) => {
          const tank_id = req.params?.tankId;
          try{
            await parameterService.getParameter(param_name, tank_id);
            return Promise.reject();
          }
          catch{
            return true;
          }
        })
      .withMessage("Parameter with this name already exists"),
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
      .withMessage("Unit of measure na must be alphanumeric")
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

export const createTaskValidation = [
  param("tankId")
    .trim()
    .notEmpty()
    .withMessage("Tank ID is required")
    .isUUID()
    .withMessage("Tank ID must be a valid UUID")
    .custom(async (tankId) => {
      try {
        await tankService.getTank(tankId);
        return true;
      } catch {
        return Promise.reject("Tank ID must reference an existing tank");
      }
    }),
  body("message")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Task message must be between 1-255 characters"),
  body("deadline")
    .trim()
    .isISO8601()
    .withMessage("Deadline must be a valid ISO8601 date"),
  body("recur_interval_days")
    .optional()
    .isInt({ min: -1 })
    .withMessage("Recur interval must be a positive integer or -1 for never repeat")
    .toInt(),
];

export const updateTaskValidation = [
  param("tankId")
    .trim()
    .notEmpty()
    .withMessage("Tank ID is required")
    .isUUID()
    .withMessage("Tank ID must be a valid UUID")
    .custom(async (tankId) => {
      try {
        await tankService.getTank(tankId);
        return true;
      } catch {
        return Promise.reject("Tank ID must reference an existing tank");
      }
    }),
  body("message")
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Task message must be between 1-255 characters"),
  body("deadline")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("Deadline must be a valid ISO8601 date"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
  body("recur_interval_days")
    .optional()
    .isInt({ min: -1 })
    .withMessage("Recur interval must be a positive integer or -1 for never repeat")
    .toInt()
];

router.use(requireAuthentication);

router.get('/:tankId/journal', checkTankOwnership, getTankJournal);
router.put('/:tankId/journal', checkTankOwnership, upsertTankJournal);

/**
 * @openapi
 * /tanks/{tankId}/tasks:
 *   get:
 *     tags:
 *       - Tanks
 *     summary: Get all tasks for a tank
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
 *                 $ref: '#/components/schemas/Task'
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
router.get('/:tankId/tasks', checkTankOwnership, getTankTasks);

/**
 * @openapi
 * /tanks/{tankId}/tasks:
 *   post:
 *     tags:
 *       - Tanks
 *     summary: Create a new task
 *     parameters:
 *       - $ref: '#/components/parameters/TankIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *      201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTaskResponse'
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
router.post('/:tankId/tasks', createTaskValidation, handleValidationErrors, checkTankOwnership, createTankTask);

router.put('/:tankId/tasks/:taskId', updateTaskValidation, handleValidationErrors, checkTankOwnership, updateTankTasks);

router.delete('/:tankId/tasks/:taskId', checkTankOwnership, deleteTankTask);

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
router.get('/:tankId/observations', checkTankOwnership, getTankObservations);

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
router.post('/:tankId/observations', createObservationValidation, handleValidationErrors, checkTankOwnership, createTankObservation);

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
router.post('/:tankId/parameters', createParameterValidation, handleValidationErrors, checkTankOwnership, createTankParameter);

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
router.get('/:tankId', checkTankOwnership, getTank);

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
