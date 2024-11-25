/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient, Prisma } from '@prisma/client';
import { addIndexToResults } from '@utils/addIndexToResults';

const prisma = new PrismaClient();

// eslint-disable-next-line max-lines-per-function
export const getUserListServices = async ({ page, limit, search, }: { page: number; limit: number; search?: string; }) => {
  console.log('🚀 ~ getUserListServices ~ search:', search);
  const skip = (page - 1) * limit;
  const take = limit;
  const whereCondition: Prisma.usersWhereInput = search
    ? {
      OR: [
        { tel: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { fullName: { contains: search, mode: 'insensitive' } },
      ],
    }
    : {};
  const [data, totalCount] = await Promise.all([
    prisma.users.findMany({
      where: { ...whereCondition },
      skip,
      take,
    }),
    prisma.users.count({
      where: { ...whereCondition },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const previousPage = isFirstPage ? null : page - 1;
  const nextPage = isLastPage ? null : page + 1;

  const dataWithIndex = addIndexToResults(data, page, limit);

  return {
    meta: {
      isFirstPage,
      isLastPage,
      currentPage: page,
      previousPage,
      nextPage,
      pageCount: totalPages,
      totalCount,
    },
    result: dataWithIndex,
  };
};
