import prisma from '../db/client';
import { User } from "../generated/prisma/client";

async function createUser(
    username: string, 
    password_hash: string
) {
    return await prisma.user.create({
        data:{
            username,
            password_hash
        }
    });
};

async function getUser(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where:{ username }
    });
};

async function getAllUsers() {
    return await prisma.user.findMany();
};

async function updateUser(
    id: string, 
    data: {
        username?: string;
        password_hash?: string;
    }
) {
    return await prisma.user.update({
        where:{ id },
        data
    });
};

async function deleteUser(id: string) {
    return await prisma.user.delete({
        where:{ id }
    });
};

export default { 
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
 };

