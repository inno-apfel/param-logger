import prisma from '../db/client';
import {type Task} from '../generated/prisma/client';

const SECONDS_IN_DAY = 86400;

async function createTask(
  message: string,
  deadline: Date,
  recur_interval_days: number,
  tank_id: string,
): Promise<Task> {
  return await prisma.task.create({
    data: {
      message,
      deadline,
      completed: false,
      recur_interval_days,
      tank: {
        connect: {id: tank_id},
      },
    },
  });
}

async function getTasksForTank(tank_id: string): Promise<Task[]> {
  // Reset deadlines for completed recurring tasks
  await prisma.$executeRaw<Task[]>`
    UPDATE "Task"
    SET 
      deadline = deadline + (
          CEIL(EXTRACT(EPOCH FROM (NOW() - deadline)) / (recur_interval_days * ${SECONDS_IN_DAY})) * recur_interval_days
      ) * INTERVAL '1 day',
      completed = false
    WHERE tank_id = ${tank_id}
    AND recur_interval_days IS NOT NULL
    AND completed = true
    AND deadline < NOW()
  `;
  const tasks = await prisma.task.findMany({
    where: {tank_id},
  });
  return tasks;
}

async function updateTaskForTank(id: string, data: Partial<Omit<Task, "id">>): Promise<Task> {
  return await prisma.task.update({
    where: { id },
    data,
  });
}

async function deleteTaskForTank(id: string): Promise<Task> {
  const task = await prisma.task.delete({
    where: {id},
  });
  return task;
}


export default {
  createTask,
  getTasksForTank,
  updateTaskForTank,
  deleteTaskForTank
};
