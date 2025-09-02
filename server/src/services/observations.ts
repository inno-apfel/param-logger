import prisma from '../db/client';
import NotFoundError from '../errors/NotFoundError'
import {type Observation} from '../generated/prisma/client';

async function getObservation(id: string): Promise<Observation> {
  const observation = await prisma.observation.findUnique({
    where: {id},
  });
  if (!observation){
    throw new NotFoundError('Observation', id); 
  }
  return observation
}

async function createObservation(value: number, parameter_id: string): Promise<Observation> {
  return await prisma.observation.create({
    data: {
      value,
      parameter: {
        connect: {id: parameter_id},
      },
    },
  });
}

async function deleteObservation(id: string): Promise<Observation> {
  return await prisma.observation.delete({
    where: {id},
  });
}

export default {
  getObservation,
  createObservation,
  deleteObservation
};
