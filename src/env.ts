import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PWD: process.env.PWD || process.cwd(),
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '0.0.0.0',
  NODE_PORT: parseInt(process.env.NODE_PORT || '1122'),
  BASE_PATH: process.env.BASE_PATH,
  SERVICE_NAME: process.env.SERVICE_NAME,
  JWT_PRIVATE_KEY: `${process.env.JWT_PRIVATE_KEY}`,
  JWT_PUBLIC_KEY: `${process.env.JWT_PUBLIC_KEY}`,
  JWT_REFRESH_PRIVATE_KEY: `${process.env.JWT_REFRESH_PRIVATE_KEY}`,
  JWT_REFRESH_PUBLIC_KEY: `${process.env.JWT_REFRESH_PUBLIC_KEY}`,
};
