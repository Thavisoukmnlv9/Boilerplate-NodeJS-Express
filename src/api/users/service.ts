import { users } from '@prisma/client';
import { prismaClient } from '../../prisma';
import logger from '../../middleware/logger/config';
import { Request } from 'express';
import { TokenPayload } from './types';

export const getManyUserService = async () => {
  try {
    const result = await prismaClient.users.findMany();
    return result;
  } catch (error) {
    return [];
  } finally {
    await prismaClient.$disconnect();
  }
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
  console.log({ user });
  const { id, ..._user } = user;
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
