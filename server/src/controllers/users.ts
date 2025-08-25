import {
  Request, 
  Response
} from 'express'

import userService from '../services/users'

export async function updateProfileAvatar(
  req: Request,
  res: Response,
) {
    if (!req.file) return res.status(400).json({ messages: ["No file uploaded"] });
    return res.json(
        await userService.updateUserAvatar(req.params.userId, req.file)
    );
};