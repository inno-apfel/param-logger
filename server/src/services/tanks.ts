import prisma from '../db/client';
import {type Tank} from '../generated/prisma/client';

async function createTank(name: string, owner_id: string): Promise<Tank> {
  return await prisma.tank.create({
    data: {
      name,
      owner: {
        connect: {id: owner_id},
      },
    },
  });
}

async function getTank(id: string): Promise<Tank> {
  const tank = await prisma.tank.findUnique({
    where: {
      id,
    },
  });
  if (!tank) {
    throw new Error(`Tank ${id} not found`)
  }
  return tank;
}

async function getAllTanksForUser(owner_id: string): Promise<Tank[]> {
  return await prisma.tank.findMany({
    where: {owner_id},
  });
}

// unused
async function updateTank(
  id: string,
  data: {
    name?: string;
  },
) {
  return await prisma.tank.update({
    where: {id},
    data,
  });
}

// unused
async function deleteTank(id: string) {
  return await prisma.tank.delete({
    where: {id},
  });
}

export default {
  createTank,
  getTank,
  getAllTanksForUser,
  updateTank,
  deleteTank,
};
