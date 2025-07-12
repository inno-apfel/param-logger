import prisma from '../db/client';

async function createParameter(
    name: string,
    reference_value: number,
    unit_of_measure: string,
    tank_id: string
) {
    return await prisma.parameter.create({
        data: {
            name,
            reference_value,
            unit_of_measure,
            tank: {
                connect: { id: tank_id }
            }
        }
    });
}

async function getParametersWithObservationsForTank(tank_id: string) {
    return await prisma.parameter.findMany({
        where: { tank_id },
        include: {
            observations: true
        }
    });
}

async function getParameter(id: string) {
    return await prisma.parameter.findUnique({
        where: { id }
    });
}

async function getAllParametersForTank(tank_id: string) {
    return await prisma.parameter.findMany({
        where: { tank_id }
    });
}

async function updateParameter(
    id: string,
    data: {
        name?: string;
        reference_value?: number;
        unit_of_measure?: string;
    }
) {
    return await prisma.parameter.update({
        where: { id },
        data
    });
}

async function deleteParameter(id: string) {
    return await prisma.parameter.delete({
        where: { id }
    });
}

export default { 
    createParameter,
    getParameter,
    getAllParametersForTank,
    updateParameter,
    deleteParameter,
    getParametersWithObservationsForTank
};