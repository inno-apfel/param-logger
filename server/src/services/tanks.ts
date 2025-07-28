import prisma from '../db/client';
import {type Tank} from '../generated/prisma/client';
import NotFoundError from '../errors/NotFoundError'

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
    throw new NotFoundError('Tank', id); 
  }
  return tank;
}

async function getAllTanksForUser(owner_id: string): Promise<Tank[]> {
  return await prisma.tank.findMany({
    where: {owner_id},
  });
}

export default {
  createTank,
  getTank,
  getAllTanksForUser,
};
