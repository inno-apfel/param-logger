import {
  Request, 
  Response
} from 'express';

import observationService from '../services/observations';
import parameterService from '../services/parameters';
import tankService from '../services/tanks';

export async function getTank(req: Request, res: Response) {
  res.send(await tankService.getTank(req.params.tankId));
};

export async function getAllTanksForUser(req: Request, res: Response) {
  const authenticatedUser = req.user;
  if (authenticatedUser) {
    return res.send(await tankService.getAllTanksForUser(authenticatedUser.id));
  }
  return res.status(400);
};

export async function createTank(req: Request, res: Response) {
  const authenticatedUser = req.user;
  if (authenticatedUser) {
    const newTank = await tankService.createTank(
      req.body.tank_name,
      authenticatedUser.id,
    );
    return res.status(201).json(newTank);
  }
  return res.status(400);
};

export async function getTankParameters(req: Request, res: Response) {
  res.send(await parameterService.getAllParametersForTank(req.params.tankId));
};

export async function createTankParameter(
  req: Request,
  res: Response,
) {
  const newParameter = await parameterService.createParameter(
    req.body.param_name,
    req.body.reference_value,
    req.body.unit_of_measure,
    req.params.tankId,
  );
  res.status(201).json(newParameter);
};

export async function getTankObservations(
  req: Request,
  res: Response,
) {
  res.send(
    await parameterService.getParametersWithObservationsForTank(
      req.params.tankId,
    ),
  );
};

export async function createTankObservation(
  req: Request,
  res: Response,
) {
  res.send(
    await observationService.createObservation(
      req.body.value,
      req.body.param_id,
    ),
  );
};
