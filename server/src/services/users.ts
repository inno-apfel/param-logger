import prisma from '../db/client';

export const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    console.log(users);
};