import prisma from '../db/client';
import {type User} from '../generated/prisma/client';

async function createUser(username: string, password_hash: string): Promise<User> {
  return await prisma.user.create({
    data: {
      username,
      password_hash,
    },
  });
}

async function getUser(username: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {username},
  });
  if (!user){
    throw new Error(`User ${username} not found`); 
  }
  return user
}

export default {
  createUser,
  getUser,
};
