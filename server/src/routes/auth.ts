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

router.get('/me', checkUserAuthentication);

router.post('/login/password', loginWithPassword);

router.post('/logout', logoutUser);

router.post(
  '/signup', 
  createUserValidation, 
  handleValidationErrors, 
  signupNewUser
);

export default router;
