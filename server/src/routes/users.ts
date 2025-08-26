import { Router } from 'express';
import { body, param } from 'express-validator';
import multer from 'multer'

import requireAuthentication from '../middlewares/requireAuthentication'
import { 
    updateProfileAvatar, 
    updateUser, 
    deleteUser 
} from '../controllers/users'

import handleValidationErrors from '../middlewares/handleValidationErrors'
import isCurrentUser from '../middlewares/isCurrentUser'
import userService from '../services/users';

const storage = multer.memoryStorage()
const upload = multer({ 
    storage, 
    fileFilter: (
        req: Express.Request, 
        file: Express.Multer.File, 
        cb: multer.FileFilterCallback
    ) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
        }
    }
});

const userIdValidation = [
    param("userId")
        .trim()
        .notEmpty()
        .withMessage("User ID is required")
        .isUUID()
        .withMessage("User ID must be a valid UUID")
        .custom(async (userId) => {
        try {
            await userService.getUserById(userId);
            return true;
        } catch {
            return Promise.reject("User ID must reference an existing User");
        }
        }),
]

const updateUserValidation = [
    body("username")
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3-30 characters")
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage("Username can only contain letters, numbers, dots, hyphens, and underscores")
        .not()
        .matches(/^[._-]|[._-]$/)
        .withMessage("Username cannot start or end with special characters")
        .custom(async (username) => {
        try{
            await userService.getUserByUsername(username);
            return Promise.reject();
        }
        catch{
            return true;
        }
        })
        .withMessage("Username already exists"),
    body("password")
        .optional()
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8-128 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
];

const router = Router();

router.use(requireAuthentication);

router.put(
    '/:userId/avatar',
    isCurrentUser,
    userIdValidation,
    handleValidationErrors,
    upload.single('avatar'),
    updateProfileAvatar);

router.put(
    '/:userId',
    isCurrentUser,
    userIdValidation,
    updateUserValidation,
    handleValidationErrors,
    updateUser);

router.delete(
    '/:userId',
    isCurrentUser,
    userIdValidation,
    handleValidationErrors,
    deleteUser);

export default router;
