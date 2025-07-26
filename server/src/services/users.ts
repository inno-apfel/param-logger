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

// unused
async function getAllUsers() {
  return await prisma.user.findMany();
}

// unused
async function updateUser(
  id: string,
  data: {
    username?: string;
    password_hash?: string;
  },
) {
  return await prisma.user.update({
    where: {id},
    data,
  });
}

// unused
async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: {id},
  });
}

export default {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
