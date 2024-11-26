export interface Request {
    search?: string;
    pagination?: {
        pageSize: number;
        currentPage: number;
    },
    filter?: {
        key: string;
        value: string;
    },
    sort?: {
        key: string;
        value: "asc" | "desc"
    }
}