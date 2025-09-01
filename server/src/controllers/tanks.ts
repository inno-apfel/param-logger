import {
  Request, 
  Response
} from 'express';
import { z } from "zod";

import observationService from '../services/observations';
import parameterService from '../services/parameters';
import tankService from '../services/tanks';
import tankJournalService from '../services/tank-journals';
import taskService from '../services/tasks';

const tankUpdateSchema = z.object({
  name: z.string().optional(),
  gallons: z.number().optional(),
  setup_date: z.date().optional()
});

const taskUpdateSchema = z.object({
  message: z.string().optional(),
  deadline: z.date().optional(),
  completed: z.boolean().optional(),
  recur_interval_days: z.number().nullable().optional()
});

export async function getTank(req: Request, res: Response) {
  res.json(await tankService.getTank(req.params.tankId));
};

export async function updateTank(req: Request, res: Response) {
  const parsed = tankUpdateSchema.parse({
    name: req.body.name || undefined,
    gallons: req.body.gallons ? parseFloat(req.body.gallons) : undefined,
    setup_date: req.body.setup_date ? new Date(req.body.setup_date) : undefined,
  });
  return res.json(
      await tankService.updateTank(
        req.params.tankId, 
        parsed, 
        req.file)
  );
};

export async function getAllTanksForUser(req: Request, res: Response) {
  const tanks = await tankService.getAllTanksForUser(req.user!.id)
  res.json(tanks);
};

export async function createTank(req: Request, res: Response) {
    const newTank = await tankService.createTank(
      req.body.name,
      req.user!.id,
      parseFloat(req.body.gallons),
      req.body.setup_date
    );
    res.status(201).json(newTank);
};

export async function createTankParameter(
  req: Request,
  res: Response,
) {
  const newParameter = await parameterService.createParameter(
    req.body.param_name,
    parseFloat(req.body.reference_value),
    req.body.unit_of_measure,
    req.params.tankId,
  );
  res.status(201).json(newParameter);
};

export async function getTankTasks(
  req: Request,
  res: Response,
) {
  res.json(
    await taskService.getTasksForTank(
      req.params.tankId,
    ),
  );
};

export async function createTankTask(
  req: Request, 
  res: Response
) {
  const newTask = await taskService.createTask(
    req.body.message,
    req.body.deadline, 
    req.body.recur_interval_days,
    req.params.tankId
  );

  res.status(201).json(newTask);
}

export async function updateTankTasks(
  req: Request,
  res: Response,
) {
  
  res.json(
    await taskService.updateTaskForTank(
      req.params.taskId,
      taskUpdateSchema.parse(req.body)
    ),
  );
};

export async function deleteTankTask(
  req: Request,
  res: Response,
) {
  res.json(
    await taskService.deleteTaskForTank(
      req.params.taskId,
    ),
  );
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
      parseFloat(req.body.value),
      req.body.param_id,
    ),
  );
};

export async function getTankJournal(
  req: Request,
  res: Response,
) {
  res.json(
    await tankJournalService.getTankJournalByTankId(
      req.params.tankId,
    ),
  );
};

/**
 * Update a tank's Tank Journal, and create it if it doesn't exist yet
 */
export async function upsertTankJournal(
  req: Request,
  res: Response,
) {
  const existing = await tankJournalService.getTankJournalByTankId(req.params.tankId);
  console.log(existing)
  if (existing) {
    res.json(
      await tankJournalService.updateTankJournal(
        existing.id,
        req.body.content
      ),
    );
  }
  else {
    res.status(201).json(
      await tankJournalService.createTankJournal(
        req.params.tankId,
        req.body.content
      ),
    );
  }
};