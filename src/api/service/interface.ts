import { PrismaModels } from "@api/interface";


export interface FetchPaginatedDataParams {
    prismaModels: any;
    skip: number;
    take: number;
    where: object;
    orderBy?: object;
}

export interface PaginatedResult<T> {
    count: number;
    totalRecords: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface GetListServiceParams {
    take?: number;
    where?: object;
    orderBy?: object,
    page?: number;
    model: PrismaModels
}

