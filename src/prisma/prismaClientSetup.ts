import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";

const prisma = new PrismaClient().$extends(
  pagination({
    pages: {
      limit: 10,
      includePageCount: true,
    },
    cursor: {
      limit: 10,
      getCursor(user) {
        return user.id.toString();
      },
      parseCursor(cursor) {
        return { id: parseInt(cursor) };
      },
    },
  })
);

export default prisma;
