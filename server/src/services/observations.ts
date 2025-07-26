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

// unused
async function createManyObservations(
  data: {
    value: number;
    parameter_id: string;
  }[],
) {
  return await prisma.observation.createMany({
    data,
  });
}

// unused
async function getObservation(id: string) {
  return await prisma.observation.findUnique({
    where: {id},
  });
}

// unused
async function getAllObservationsForParameter(parameter_id: string) {
  return await prisma.observation.findMany({
    where: {parameter_id},
  });
}

// unused
async function updateObservation(
  id: string,
  data: {
    value?: number;
  },
) {
  return await prisma.observation.update({
    where: {id},
    data,
  });
}

// unused
async function deleteObservation(id: string) {
  return await prisma.observation.delete({
    where: {id},
  });
}

export default {
  createObservation,
  createManyObservations,
  getObservation,
  getAllObservationsForParameter,
  updateObservation,
  deleteObservation,
};
