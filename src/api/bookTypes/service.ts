import logger from '@middleware/logger/config';
import { bookType, } from '@prisma/client';
import { prismaClient } from '@prisma/index';


export const addBookTypeService = async (bookTypeData: Omit<bookType, 'id'>) => {
  try {
    return await prismaClient.bookType.create({ data: bookTypeData });
  } catch (error) {
    handleError(error, 'Error creating book type');
    throw error;
  } finally {
    await safelyDisconnectPrisma();
  }
};

export const editBookTypeService = async ({ id, data }: { id: number; data: Omit<bookType, 'id'> }) => {
  try {
    return await prismaClient.bookType.update({
      data,
      where: { id: id },
    });
  } catch (error) {
    handleError(error, 'Error creating book type');
    throw error;
  } finally {
    await safelyDisconnectPrisma();
  }
};

export const deleteBookTypeService = async ({ id, data }: { id: number; data: Pick<bookType, 'deletedAt'> }) => {
  try {
    return await prismaClient.bookType.update({
      data,
      where: { id: id },
    });
  } catch (error) {
    handleError(error, 'Error deleting book type');
    throw error;
  } finally {
    await safelyDisconnectPrisma();
  }
};

const handleError = (error: unknown, contextMessage: string) => {
  if (error instanceof Error) {
    logger.error(`${contextMessage}: ${error.message}`);
  } else {
    logger.error(`${contextMessage}: An unknown error occurred.`);
  }
};

const safelyDisconnectPrisma = async () => {
  try {
    await prismaClient.$disconnect();
  } catch (disconnectError) {
    logger.error(`Error disconnecting from database: ${disconnectError}`);
  }
};

export const getManyBookTypeService = async () => {
  try {
    const result = await prismaClient.bookType.findMany();
    return result;
  } catch (error) {
    return [];
  } finally {
    await prismaClient.$disconnect();
  }
};