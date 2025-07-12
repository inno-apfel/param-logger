import prisma from '../db/client';

async function createTank(
    name: string, 
    owner_id: string
) {
    return await prisma.tank.create({
        data:{
            name,
            owner: {
                connect: { id: owner_id }
            }
        }
    });
};

async function getTank(id: string) {
    return await prisma.tank.findUnique({
        where:{
            id
        }
    });
};

async function getAllTanksForUser(owner_id: string) {
    return await prisma.tank.findMany({
        where: { owner_id }
    });
};

async function updateTank(
    id: string,
    data: {
        name?: string;
    }
) {
    return await prisma.tank.update({
        where: { id },
        data
    });
};

async function deleteTank(id: string) {
    return await prisma.tank.delete({
        where:{ id }
    });
};

export default { 
    createTank,
    getTank,
    getAllTanksForUser,
    updateTank,
    deleteTank
 };