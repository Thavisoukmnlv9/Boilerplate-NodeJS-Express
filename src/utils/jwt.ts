import { NextFunction, Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../env';
import { logNamespace } from '../middleware/logger/logger-middleware';
import { TokenPayload } from '../api/users/types';

const i = 'Champa Lab'; // Issuer (Software organization who issues the token)
const s = 'sonephetmnlv@gmail.com'; // Subject (intended user of the token)
const a = 'https://champalab.com'; // Audience (Domain within which this token will live and function)

const refreshTokenOptions: SignOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '30d',
  algorithm: 'PS512',
};

export const signRefreshToken = async (payload: object) => {
  try {
    const privateKEY = env.JWT_REFRESH_PRIVATE_KEY;
    return jwt.sign(payload, privateKEY, refreshTokenOptions);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let refreshToken = req.headers['x-refresh-token'] as string;

  if (req.headers.authorization) {
    refreshToken = `${req.headers.authorization}`.replace('Bearer ', '');
  } else if (!refreshToken)
    return res.json({ status: 'error', message: 'No token provided.' });

  const publicKEY = env.JWT_REFRESH_PUBLIC_KEY ?? '';

  jwt.verify(refreshToken, publicKEY, refreshTokenOptions, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Failed to authenticate token.',
      });
    }
    if (decoded) {
      const payload = decoded as TokenPayload;
      logNamespace.run(() => {
        if (payload.tel) logNamespace.set('tel', payload.tel);
        if (payload.id) logNamespace.set('id', payload.id);
        if (payload.role) logNamespace.set('role', payload.role);
        if (payload.fullName) logNamespace.set('fullName', payload.fullName);
      });

      // @ts-ignore
      req.tokenPayload = decoded;
    }
    next();
  });
};

const accessTokenOptions: SignOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '1day',
  algorithm: 'PS512',
};

export const sign = async (payload: object) => {
  try {
    const privateKEY = env.JWT_PRIVATE_KEY;
    return jwt.sign(payload, privateKEY, accessTokenOptions);
  } catch (error) {
    return null;
  }
};

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers['x-access-token'] as string;

  if (req.headers.authorization) {
    token = `${req.headers.authorization}`.replace('Bearer ', '');
  }
  if (!token)
    return res.json({ status: 'error', message: 'No token provided.' });

  const publicKEY = env.JWT_PUBLIC_KEY ?? '';

  jwt.verify(token, publicKEY, accessTokenOptions, (err, decoded) => {
    if (err) {
      return res.json({ status: 'invalid', message: 'Token unauthorized.' });
    }
    if (decoded) {
      const payload = decoded as TokenPayload;
      logNamespace.run(() => {
        if (payload.tel) logNamespace.set('tel', payload.tel);
        if (payload.id) logNamespace.set('id', payload.id);
        if (payload.role) logNamespace.set('role', payload.role);
        if (payload.fullName) logNamespace.set('fullName', payload.fullName);
      });

      console.log('--'.repeat(50));
      console.log({ decoded });
      // @ts-ignore
      req.tokenPayload = decoded;
    }
    next();
  });
};
