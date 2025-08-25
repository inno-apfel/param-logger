import { 
  GetObjectCommand, 
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import sharp from 'sharp'

import prisma from '../db/client';
import {
  s3, 
  BUCKET_NAME 
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
  user.avatar = await getAvatarUrlIfExists(user.avatar);
  return user
}

async function getUserByUsername(username: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {username},
  });
  if (!user){
    throw new NotFoundError('User', username); 
  }
  user.avatar = await getAvatarUrlIfExists(user.avatar);
  return user
}

async function updateUser(id: string, data: Partial<Omit<User, "id" | "username">>): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data
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
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.mimetype
  }));
  // delete old image
  const user = await prisma.user.findUnique({
      where: {id: userId},
    });
  if (!user){
    throw new NotFoundError('User', userId); 
  }
  const oldAvatar = user.avatar;
  if (oldAvatar){
    console.log(oldAvatar)
    await s3.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: oldAvatar,
    }))
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

async function getAvatarUrlIfExists(avatarFileName: string | null){
  if (!avatarFileName) return null;
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: avatarFileName
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return url;
}

export default {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  updateUserAvatar
};

