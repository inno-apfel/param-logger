import { Router } from 'express';
import { body } from 'express-validator';

import {
  checkUserAuthentication,
  loginWithPassword,
  logoutUser,
  signupNewUser
} from '../controllers/auth'
import handleValidationErrors from '../middlewares/handleValidationErrors'

const router = Router();

const createUserValidation = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3-30 characters")
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage("Username can only contain letters, numbers, dots, hyphens, and underscores")
        .not()
        .matches(/^[._-]|[._-]$/)
        .withMessage("Username cannot start or end with special characters"),
    body("password")
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8-128 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
]

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Check user authentication status
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/me', checkUserAuthentication);

/**
 * @openapi
 * /auth/login/password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log in a user with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsernamePasswordInput'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login/password', loginWithPassword);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log out user if authenticated
 *     description: Ends the user session and redirects to the home page. Uses Passport.js `req.logout()`.
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/logout', logoutUser);

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign up and create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsernamePasswordInput'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserObjectResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/signup', 
  createUserValidation, 
  handleValidationErrors, 
  signupNewUser
);

export default router;
