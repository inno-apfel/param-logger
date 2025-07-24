import {
  Request, 
  Response
} from 'express';

import userService from '../services/users';

export async function getUser(req: Request, res: Response) {
  res.send(await userService.getUser(req.params.userId));
};

export async function getAllUsers(req: Request, res: Response) {
  res.send(await userService.getAllUsers());
};

export async function createUser(req: Request, res: Response) {
  const newUser = await userService.createUser(
    req.body.username,
    req.body.password,
  );
  res.status(201).json(newUser);
};
