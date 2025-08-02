/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         messages:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - Something went wrong
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2025-08-01T23:38:23.362Z"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UsernamePasswordInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: "admin"
 *         password:
 *           type: string
 *           example: "password"
 *     UserObjectResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f0006e8d-1ade-4d35-90fb-d20bc30dc5b8"
 *         username:
 *           type: string
 *           example: "admin"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateObservationInput:
 *       type: object
 *       required:
 *         - value
 *         - param_id
 *       properties:
 *         value:
 *           type: string
 *           example: 1.025
 *         param_id:
 *           type: string
 *           format: uuid
 *           example: "1e2a16fd-7137-4587-bbb1-a0758217145c"
 *     CreateObservationResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "f0006e8d-1ade-4d35-90fb-d20bc30dc5b8"
 *         value:
 *           type: number
 *           example: 1.025
 *         recorded_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-01T23:38:23.362Z"
 *         parameter_id:
 *           type: string
 *           format: uuid
 *           example: "0c5701ce-d763-4880-a4ad-b2c248bbf80d"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateParameterInput:
 *       type: object
 *       required:
 *         - param_name
 *         - reference_value
 *         - unit_of_measure
 *         - tank_id
 *       properties:
 *         param_name:
 *           type: string
 *           example: Salinity
 *         reference_value:
 *           type: number
 *           example: 1.025
 *         unit_of_measure:
 *           type: string
 *           example: "SG"
 *         tank_id:
 *           type: string
 *           format: uuid
 *           example: "25302a04-139c-47ef-8ced-7754aac35c4a"
 *     CreateParameterResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "b51ebe8d-0af4-4ba8-a6e3-0260885902f7"
 *         param_name:
 *           type: string
 *           example: Salinity
 *         reference_value:
 *           type: number
 *           example: 1.025
 *         unit_of_measure:
 *           type: string
 *           example: "SG"
 *         tank_id:
 *           type: string
 *           format: uuid
 *           example: "25302a04-139c-47ef-8ced-7754aac35c4a"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTankInput:
 *       type: object
 *       required:
 *         - tank_name
 *       properties:
 *         tank_name:
 *           type: string
 *           example: "My Tank"
 *     Tank:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "25302a04-139c-47ef-8ced-7754aac35c4a"
 *         name:
 *           type: string
 *           example: "My Tank"
 *         owner_id:
 *           type: string
 *           format: uuid
 *           example: "010ffa1a-20bf-4d87-8bf8-99aa0b527975"
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     Observation:
 *       type: object
 *       required:
 *         - id
 *         - value
 *         - recorded_at
 *         - parameter_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "0c5701ce-d763-4880-a4ad-b2c248bbf80d"
 *         value:
 *           type: number
 *           example: 42
 *         recorded_at:
 *           type: string
 *           format: date-time
 *           example: "2025-07-14T02:07:37.412Z"
 *         parameter_id:
 *           type: string
 *           format: uuid
 *           example: "1e2a16fd-7137-4587-bbb1-a0758217145c"
 *     ParameterWithObservations:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - reference_value
 *         - unit_of_measure
 *         - tank_id
 *         - observations
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "1e2a16fd-7137-4587-bbb1-a0758217145c"
 *         name:
 *           type: string
 *           example: "pH"
 *         reference_value:
 *           type: number
 *           example: 8.2
 *         unit_of_measure:
 *           type: string
 *           example: "pH"
 *         tank_id:
 *           type: string
 *           format: uuid
 *           example: "25302a04-139c-47ef-8ced-7754aac35c4a"
 *         observations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Observation'
 */

/**
 * @openapi
 * components:
 *   parameters:
 *     TankIdParam:
 *       name: tankId
 *       in: path
 *       description: UUID of the tank
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *         example: "25302a04-139c-47ef-8ced-7754aac35c4a"
 */

