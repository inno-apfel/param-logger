import prisma from '../db/client';
import {type TankJournal} from '@prisma/client';

async function createTankJournal(tank_id: string, content: any): Promise<TankJournal> {
  return await prisma.tankJournal.create({
    data: {
      content,
      tank: {
        connect: {id: tank_id},
      },
    },
  });
}

async function getTankJournalByTankId(tank_id: string): Promise<TankJournal | null> {
  const tank = await prisma.tankJournal.findUnique({
    where: {
      tank_id,
    },
  });
  return tank;
}

async function updateTankJournal(id: string, content: Record<string, any>): Promise<TankJournal> {
  return await prisma.tankJournal.update({
    where: { id },
    data: {
        content
    }
  });
}

export default {
  createTankJournal,
  getTankJournalByTankId,
  updateTankJournal,
};
