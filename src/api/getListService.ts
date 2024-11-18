import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



interface FetchPaginatedDataParams {
  prismaModels: any;
  skip: number;
  take: number;
  where: object;
  orderBy?: object;
}

// Interface for the result structure returned by the service
interface PaginatedResult<T> {
  count: number;
  totalRecords: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Pagination utilities.
 */
const PaginationUtils = {
  calculateSkip: (page: number, take: number): number => {
    return (page - 1) * take;
  },

  calculateTotalPages: (totalRecords: number, take: number): number => {
    return Math.ceil(totalRecords / take);
  },

  generatePaginationUrls: (
    baseUrl: string,
    page: number,
    totalPages: number
  ): { next: string | null; previous: string | null } => {
    const next = page < totalPages ? `${baseUrl}?page=${page + 1}` : null;
    const previous = page > 1 ? `${baseUrl}?page=${page - 1}` : null;
    return { next, previous };
  },

  addIndexToResults: <T>(data: T[], skip: number): T[] => {
    return data.map((record, index) => ({
      index: skip + index + 1,
      ...record,
    }));
  },
};

/**
 * Data access layer for Prisma interactions.
 */
const DataService = {
  countRecords: async (prismaModels: any, where: object): Promise<number> => {
    return await prismaModels.count({ where });
  },

  fetchPaginatedData: async ({
    prismaModels,
    skip,
    take,
    where,
    orderBy = {},
  }: FetchPaginatedDataParams): Promise<any[]> => {
    return await prismaModels.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  },

  fetchPaginatedDataAndCount: async ({
    prismaModels,
    skip,
    take,
    where,
    orderBy,
  }: FetchPaginatedDataParams): Promise<[any[], number]> => {
    const data = prismaModels.findMany({
      skip,
      take,
      where,
      orderBy,
    });
    const totalRecords = prismaModels.count({ where });
    return Promise.all([data, totalRecords]);
  },
};

/**
 * Main service function to fetch paginated books.
 */
export const getManyBookService = async (): Promise<PaginatedResult<any>> => {
  const modelName = "books";
  const prismaModels = prisma[modelName] as any;
  const where = {};
  const orderBy = {};
  const page = 2; // Example page
  const take = 10; // Example limit

  try {
    const skip = PaginationUtils.calculateSkip(page, take);

    // Use simplified method to fetch data and count in one call
    const [data, totalRecords] = await DataService.fetchPaginatedDataAndCount({
      prismaModels,
      skip,
      take,
      where,
      orderBy,
    });

    const totalPages = PaginationUtils.calculateTotalPages(totalRecords, take);

    const baseUrl = "127.0.0.1:3000/boilerplat/v1/books";
    const { next, previous } = PaginationUtils.generatePaginationUrls(baseUrl, page, totalPages);

    // Use the new utility function to add the index
    const results = PaginationUtils.addIndexToResults(data, skip);

    return {
      count: results.length,
      totalRecords,
      next,
      previous,
      results,
    };
  } catch (error) {
    console.error("Error fetching paginated books:", error);
    return {
      count: 0,
      totalRecords: 0,
      next: null,
      previous: null,
      results: [],
    };
  } finally {
    await prisma.$disconnect();
  }
};
