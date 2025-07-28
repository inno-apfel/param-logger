import {
  Request, 
  Response
} from 'express';

import observationService from '../services/observations';
import parameterService from '../services/parameters';
import tankService from '../services/tanks';

export async function getTank(req: Request, res: Response) {
  res.json(await tankService.getTank(req.params.tankId));
};

export async function getAllTanksForUser(req: Request, res: Response) {
  const tanks = await tankService.getAllTanksForUser(req.user!.id)
  res.json(tanks);
};

export async function createTank(req: Request, res: Response) {
    const newTank = await tankService.createTank(
      req.body.tank_name,
      req.user!.id,
    );
    res.status(201).json(newTank);
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
  res.json(
    await parameterService.getParametersWithObservationsForTank(
      req.params.tankId,
    ),
  );
};

export async function createTankObservation(
  req: Request,
  res: Response,
) {
  res.status(201).json(
    await observationService.createObservation(
      req.body.value,
      req.body.param_id,
    ),
  );
};
