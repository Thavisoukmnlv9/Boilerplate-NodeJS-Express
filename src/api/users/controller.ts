import { Request, Response } from 'express';
import {
  createUserService,
  findOneUserService,
  getListUserServices,
} from './service';
import { users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import logger from '@middleware/logger/config';
import { sign } from '@utils/jwt';
import { getUserListServices } from './get';



export const getManyUserController = async (req: Request, res: Response) => {
  const { page = "1", limit = "10", search = "" } = req.query;
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
  console.log("--".repeat(50));
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
