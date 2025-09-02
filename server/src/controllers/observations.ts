import {
  Request, 
  Response
} from 'express'

import observationService from '../services/observations';

export async function deleteObservation(
  req: Request,
  res: Response,
) {
  res.json(
    await observationService.deleteObservation(req.params.observationId)
  );
};