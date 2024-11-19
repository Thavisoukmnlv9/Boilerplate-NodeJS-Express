import { books, } from '@prisma/client';
import logger from '@middleware/logger/config';
import { prismaClient } from '@prisma/index';
import prisma from '@prisma/prismaClientSetup';
import { addIndexToResults } from '@utils/addIndexToResults';

export const getListBooksServices = async ({ page = 1, limit = 10, }: { page: number; limit: number; }) => {
  const [data, meta] = await prisma.books.paginate().withPages({
    page,
    limit,
    includePageCount: true,
  });
  const dataWithIndex = addIndexToResults(data, page, limit);
  return { meta, result: dataWithIndex };
};

export const addBookService = async (data: Omit<books, 'id' >) => {
  try {
    return await prismaClient.books.create({ data });
  } catch (error) {
    handleError(error, 'Error creating book ');
    throw error;
  } finally {
    await safelyDisconnectPrisma();
  }
};

export const getOneBookService = async (id: number) => {
  try {
    const result = await prismaClient.books.findUnique({
      where: { id },
    });
    if (!result) {
      throw new Error(`Book with id ${id} not found.`);
    }
    return result;
  } catch (error) {
    handleError(error, `Error fetching book with id ${id}`);
    throw error;
  } finally {
    await safelyDisconnectPrisma();
  }
};


export const editBookService = async ({ id, data }: { id: number; data: Omit<books, 'id'> }) => {
  try {
    return await prismaClient.books.update({
      data,
      where: { id: id },
    });
  } catch (error) {
    handleError(error, 'Error creating book');
    throw error;
  } finally {
    await safelyDisconnectPrisma();
  }
};

export const deleteBookService = async ({ id, data }: { id: number; data: Pick<books, 'deletedAt'> }) => {
  try {
    return await prismaClient.books.update({
      data,
      where: { id: id },
    });
  } catch (error) {
    handleError(error, 'Error deleting book ');
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

export const getManyBookService = async () => {
  try {
    const result = await prismaClient.books.findMany();
    return result;
  } catch (error) {
    return [];
  } finally {
    await prismaClient.$disconnect();
  }
};

