import { Request, Response } from 'express';
import userService from '../services/users'

export const getUser = async function (req: Request, res: Response) {
    res.send(await userService.getUser(req.params.userId))
}

export const getAllUsers = async function (req: Request, res: Response) {
    res.send(await userService.getAllUsers())
}

export const createUser = async function (req: Request, res: Response) {
    const newUser = await userService.createUser(req.body.username, req.body.password);
    res.status(201).json(newUser);
}