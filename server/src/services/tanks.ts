import sharp from 'sharp';

import prisma from '../db/client';
import { 
  uploadFileToS3, 
  deleteFileFromS3, 
  getPreSignedUrlIfExists 
} from '../db/s3';
import {type Tank} from '@prisma/client';
import NotFoundError from '../errors/NotFoundError';
import generateFileName from '../utils/generateFileName';

async function createTank(name: string, owner_id: string, gallons: number, setup_date: Date): Promise<Tank> {
  return await prisma.tank.create({
    data: {
      name,
      gallons,
      setup_date,
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
  tank.banner = await getPreSignedUrlIfExists(tank.banner);
  return tank;
}

async function deleteTank(id: string): Promise<Tank> {
  // delete images from s3
  const tank = await prisma.tank.findUnique({ where: { id } });
  if (!tank){
    throw new NotFoundError('Tank', id); 
  }
  if (tank.banner) {
    deleteFileFromS3(tank.banner)
  }
  const deletedTank = await prisma.tank.delete({
    where: {
      id,
    },
  });
  return deletedTank;
}

async function updateTank(id: string, data: Partial<Omit<Tank, "id" | "owner_id">>, file?: Express.Multer.File): Promise<Tank> {

  const updates: any = {
    ...data,
  };
  if (file) {
    // create and upload new banner
    const buffer = await sharp(file.buffer)
      .jpeg()
      .toBuffer();
    const fileName = generateFileName();
    await uploadFileToS3(fileName, buffer, file.mimetype);
    updates.banner = fileName;
    // delete old image
    const tank = await prisma.tank.findUnique({
      where: {id},
    });
    if (!tank){
      throw new NotFoundError('Tank', id); 
    }
    const oldAvatar = tank.banner;
    if (oldAvatar){
      deleteFileFromS3(oldAvatar);
    }
    // save filename in Postgres
    await prisma.tank.update({
      where: { id },
      data: { 
        banner: fileName 
      }
    });
  }

  const newTank = await prisma.tank.update({
    where: { id },
    data: updates,
  });

  return newTank;
}

async function getAllTanksForUser(owner_id: string): Promise<Tank[]> {
  const tanks = await prisma.tank.findMany({
    where: { owner_id },
  });

  return await Promise.all(
    tanks.map(async (tank) => {
      tank.banner = await getPreSignedUrlIfExists(tank.banner);
      return tank;
    })
  );
}

export default {
  createTank,
  getTank,
  deleteTank,
  updateTank,
  getAllTanksForUser,
};
