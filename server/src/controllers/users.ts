import {
  Request, 
  Response
} from 'express'
import { z } from "zod";

import userService from '../services/users'

const userUpdateSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
});

export async function updateUser(
  req: Request,
  res: Response,
) {
  res.json(
    await userService.updateUser(
      req.params.userId,
      userUpdateSchema.parse(req.body)
    ),
  );
};

export async function updateProfileAvatar(
  req: Request,
  res: Response,
) {
    if (!req.file) return res.status(400).json({ messages: ["No file uploaded"] });
    return res.json(
        await userService.updateUserAvatar(req.params.userId, req.file)
    );
};

export async function deleteUser(
  req: Request,
  res: Response,
) {
  const user = await userService.deleteUser(req.params.userId)
  if (req.session.passport?.user === req.params.userId) {
    req.logout(() => {});
    res.clearCookie("connect.sid")
  }
  res.json(user);
};