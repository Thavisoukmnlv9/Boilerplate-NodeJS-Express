import { PrismaClient } from '@prisma/client';
import extension from '../utils/extension';
import { pagination } from "prisma-extension-pagination";

extension;

export const prismaClient = new PrismaClient({
  //   log: ["query", "info", "warn", "error"],
});


const prisma = new PrismaClient().$extends(pagination());