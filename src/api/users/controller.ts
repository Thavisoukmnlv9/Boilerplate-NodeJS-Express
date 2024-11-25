/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Request, Response } from 'express';
import {
  createUserService,
  findOneUserService,
  findUserService,
  getListUserServices,
  updateUserAccountService,
} from './service';
import { users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import logger from '@middleware/logger/config';
import { sign } from '@utils/jwt';
import { getOneUserServices, getUserListServices } from './get';
import { buildUserRecord } from './lib';



export const getManyUserController = async (req: Request, res: Response) => {
  const { page = '1', limit = '10', search = '' } = req.query;
  const pageInt = parseInt(page as string, 10);
  const limitInt = parseInt(limit as string, 10);
  const user = await getUserListServices({
    page: pageInt,
    limit: limitInt,
    search: search as string,
  });
  res.json({
    status: 'ok',
    message: 'success',
    ...user,
  });
};
export const getOneUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID',
      });
    }
    const user = await getOneUserServices({ id });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    return res.json({
      status: 'ok',
      message: 'User retrieved successfully',
      ...user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred',
      error: (error as Error).message,
    });
  }
};


 
export const createUserController = async (req: Request, res: Response) => {
  const fullName = req.body.fullName;
  const tel = req.body.tel;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role || 'staff';
  const status = true;
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    const check = await findOneUserService(tel);
    if (check) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'ໝາຍເລກໂທລະສັບນີ້ ມີໃນລະບົບແລ້ວ',
      });
    }

    const _user: users = {
      fullName,
      tel,
      email,
      password: passwordHash,
      role,
      status,
      updatedAt: new Date(),
      createdAt: new Date(),
      id: 2,
      deletedAt: null,
    };
    const user = await createUserService(_user);

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'ສ້າງບັນຊີສໍາເລັດ',
      user,
    });
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'ສ້າງບັນຊີບໍ່ສໍາເລັດ',
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  console.log('--'.repeat(50));
  const tel = req.body.tel;
  const password = req.body.password;

  const check = await findOneUserService(tel);
  if (!check) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'error',
      message: 'ເບີໂທ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
    });
  }

  const match = bcrypt.compareSync(password, check.password);
  if (!match) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'error',
      message: 'ເບີໂທ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
    });
  }

  const payload = {
    id: check.id,
    tel: check.tel,
    roles: [check.role],
    fullName: check.fullName,
    email: check.email
  };

  const accessToken = await sign(payload);
  const refreshToken = await sign(payload);
  if (!accessToken) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'You have been authenticated',
    user: payload,
    accessToken,
    refreshToken
  });
};

export const updateUserEditAccountController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const data = await buildUserRecord(req.body);
    const checkPhone = await findUserService(data.tel);
    if (checkPhone && checkPhone.id !== id) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'ເບີໂທນີ້ ຖືກໃຊ້ງານແລ້ວ',
      });
    }
    const result = await updateUserAccountService({ data, id });
    return res.json({
      status: 'success',
      message: 'edit success',
      data: result,
    });
  } catch (e) {
    logger.error(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'An unexpected error occurred',
    });
  }
};

