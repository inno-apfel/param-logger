import { Request, Response } from 'express';
import tankService from '../services/tanks'
import parameterService from '../services/parameters'
import observationService from '../services/observations'

export const getTank = async function (req: Request, res: Response) {
    res.send(await tankService.getTank(req.params.tankId))
}

export const getAllTanksForUser = async function (req: Request, res: Response) {
    // @ts-ignore
    res.send(await tankService.getAllTanksForUser(req.user.id))
}

export const createTank = async function (req: Request, res: Response) {
    // @ts-ignore
    const newTank = await tankService.createTank(req.body.tank_name, req.user.id);
    res.status(201).json(newTank);
}

export const getTankParameters = async function (req: Request, res: Response) {
    res.send(await parameterService.getAllParametersForTank(req.params.tankId))
}

export const createTankParameter = async function (req: Request, res: Response) {
    const newParameter = await parameterService.createParameter(req.body.param_name, req.body.reference_value, req.body.unit_of_measure, req.params.tankId)
    res.status(201).json(newParameter);
}

export const getTankObservations = async function (req: Request, res: Response) {
    res.send(await parameterService.getParametersWithObservationsForTank(req.params.tankId))
}

export const createTankObservation = async function (req: Request, res: Response) {
    res.send(await observationService.createObservation(req.body.value, req.body.param_id))
}