import { PrismaClient } from '@prisma/client';
import extension from '../utils/extension';
extension;

export const prismaClient = new PrismaClient({
  //   log: ["query", "info", "warn", "error"],
});
