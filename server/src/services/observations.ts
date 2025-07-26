import prisma from '../db/client';
import {type Observation} from '../generated/prisma/client';

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

export default {
  createObservation,
};
