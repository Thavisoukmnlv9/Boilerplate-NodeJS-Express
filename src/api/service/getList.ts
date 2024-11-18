import { PrismaClient } from "@prisma/client";
import { FetchPaginatedDataParams, GetListServiceParams, PaginatedResult } from "./interface";
import env from "@utils/env";

const prisma = new PrismaClient();

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

const DataService = {
    countRecords: async (prismaModels: any, where: object): Promise<number> => {
        return await prismaModels.count({ where });
    },
    fetchPaginatedData: async ({ prismaModels, skip, take, where, orderBy = {}, }: FetchPaginatedDataParams): Promise<any[]> => {
        return await prismaModels.findMany({ skip, take, where, orderBy, });
    },
    fetchPaginatedDataAndCount: async ({ prismaModels, skip, take, where, orderBy, }: FetchPaginatedDataParams): Promise<[any[], number]> => {
        const data = prismaModels.findMany({ skip, take, where, orderBy, });
        const totalRecords = prismaModels.count({ where });
        return Promise.all([data, totalRecords]);
    },
};

export const getListService = async ({ model, page = 1, orderBy={}, where = {}, take = 10 }: GetListServiceParams): Promise<PaginatedResult<any>> => {
    const prismaModels = prisma[model] as any;
    const baseUrl = `${env.HOST}:${env.NODE_PORT}${env.BASE_PATH}/v1/${model as string}`;
    try {
        const skip = PaginationUtils.calculateSkip(page, take);
        const [data, totalRecords] = await DataService.fetchPaginatedDataAndCount({ prismaModels, skip, take, where, orderBy, });
        const totalPages = PaginationUtils.calculateTotalPages(totalRecords, take);
        const { next, previous } = PaginationUtils.generatePaginationUrls(baseUrl, page, totalPages);
        const results = PaginationUtils.addIndexToResults(data, skip);
        return { count: results.length, totalRecords, next, previous, results, };
    } catch (error) {
        return { count: 0, totalRecords: 0, next: null, previous: null, results: [], };
    } finally {
        await prisma.$disconnect();
    }
};
