import prisma from '../db/client';
import {type Parameter} from '../generated/prisma/client';

async function createParameter(
  name: string,
  reference_value: number,
  unit_of_measure: string,
  tank_id: string,
): Promise<Parameter> {
  return await prisma.parameter.create({
    data: {
      name,
      reference_value,
      unit_of_measure,
      tank: {
        connect: {id: tank_id},
      },
    },
  });
}

async function getParametersWithObservationsForTank(tank_id: string): Promise<Parameter[]> {
  const parameter = await prisma.parameter.findMany({
    where: {tank_id},
    include: {
      observations: true,
    },
  });
  return parameter;
}


export default {
  createParameter,
  getParametersWithObservationsForTank,
};
