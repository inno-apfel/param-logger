import bcrypt from 'bcryptjs'
import sharp from 'sharp'

import prisma from '../db/client';
import {
  uploadFileToS3,
  deleteFileFromS3,
  getPreSignedUrlIfExists
} from '../db/s3'
import {type User} from '../generated/prisma/client';
import NotFoundError from '../errors/NotFoundError'
import generateFileName from '../utils/generateFileName'

async function createUser(username: string, password_hash: string): Promise<User> {
  return await prisma.user.create({
    data: {
      username,
      password_hash,
    },
  });
}

async function getUserById(id: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {id},
  });
  if (!user){
    throw new NotFoundError('User', id); 
  }
  user.avatar = await getPreSignedUrlIfExists(user.avatar);
  return user
}

async function getUserByUsername(username: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {username},
  });
  if (!user){
    throw new NotFoundError('User', username); 
  }
  user.avatar = await getPreSignedUrlIfExists(user.avatar);
  return user
}

async function updateUser(
  id: string, 
  data: {
    username?: string;
    password?: string;
  }
): Promise<User> {

  const updateData = {
    ...(data.username && { username: data.username }),
    ...(data.password && { password_hash: await bcrypt.hash(data.password, 10) }),
  };

  return prisma.user.update({
    where: { id },
    data: updateData,
  });
}

export async function updateUserAvatar(userId: string, file: Express.Multer.File) {
  // transform image to small square jpeg
  const buffer = await sharp(file.buffer)
    .resize({ width: 512, height: 512, fit: "cover", position: "center" })
    .jpeg()
    .toBuffer();
  // push image to s3
  const fileName = generateFileName();
  await uploadFileToS3(fileName, buffer, file.mimetype)
  // delete old image
  const user = await prisma.user.findUnique({
    where: {id: userId},
  });
  if (!user){
    throw new NotFoundError('User', userId); 
  }
  const oldAvatar = user.avatar;
  if (oldAvatar){
    deleteFileFromS3(oldAvatar);
  }
  // save filename in Postgres
  await prisma.user.update({
    where: { id: userId },
    data: { 
      avatar: fileName 
    }
  });
  return fileName;
}

async function deleteUser(id: string): Promise<User> {
  // delete images from s3
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user){
    throw new NotFoundError('User', id); 
  }
  if (user.avatar) {
    deleteFileFromS3(user.avatar)
  }

  const deletedUser = await prisma.user.delete({
    where: {id},
  });
  return deletedUser
}

export default {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  updateUserAvatar,
  deleteUser
};

