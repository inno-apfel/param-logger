import { Router } from 'express';
import multer from 'multer'

import requireAuthentication from '../middlewares/requireAuthentication'
import { updateProfileAvatar,  } from '../controllers/users'

import isCurrentUser from '../middlewares/isCurrentUser'

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

const router = Router();

router.use(requireAuthentication);

router.put(
    '/:userId/avatar',
    isCurrentUser,
    upload.single('avatar'),
    updateProfileAvatar);

export default router;
