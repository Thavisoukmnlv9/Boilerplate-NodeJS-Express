import { Request, Response } from 'express';
import env from '../env';

export const helpCheck = (_: Request, res: Response) => {
  res.json({
    status: 'ok',
    upTime: process.uptime(),
    timestamp: Date.now(),
    base_path: env.BASE_PATH,
    environment: env.NODE_ENV,
    service: env.SERVICE_NAME,
    message: 'Help is here!',
  });
};
