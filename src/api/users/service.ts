import { users } from '@prisma/client';
import { prismaClient } from '../../prisma';
import logger from '../../middleware/logger/config';
import { Request } from 'express';
import { TokenPayload } from './types';
import { addIndexToResults } from '@utils/addIndexToResults';

import { PrismaClient } from '@prisma/client';
import { pagination } from "prisma-extension-pagination";

export const prismaClients = new PrismaClient({
  // log: ["query", "info", "warn", "error"],
});

const prisma = new PrismaClient().$extends(pagination());


export const getListUserServices = async ({ page, limit, search }: { page: number; limit: number; search?: string }) => {

  const [data, meta] = await prisma.users.paginate().withPages({
    page,
    limit,
    includePageCount: true,
    where: {
      tel: "59684710"
    },
  });
  const dataWithIndex = addIndexToResults(data, page, limit);
  return { meta, result: dataWithIndex };
};



export const findOneUserService = async (tel: string) => {
  try {
    const result = await prismaClient.users.findFirst({
      where: {
        tel,
      },
    });

    return result;
  } catch (error) {
    return null;
  } finally {
    await prismaClient.$disconnect();
  }
};


export const createUserService = async (user: users) => {
  const { id, ..._user } = user;
  console.log("🚀 ~ createUserService ~ user:", _user)

  try {
    const result = await prismaClient.users.create({
      data: _user,
      select: {
        id: true,
        fullName: true,
        tel: true,
        email: true,
      },
    });

    return result;
  } catch (error) {
    logger.error(error);
    return null;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const tokenPayloadService = (req: Request): TokenPayload => {
  // @ts-ignore
  const payload = req.tokenPayload;
  return payload;
};
