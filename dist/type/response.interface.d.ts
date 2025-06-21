export interface IApiResponse<T> {
    statusCode: number;
    status: boolean;
    message: string;
    data?: T | null;
    errors?: Record<string, string>;
}
