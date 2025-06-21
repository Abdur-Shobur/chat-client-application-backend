import { IApiResponse } from 'src/type';
export declare class ResponseHelper {
    static success<T>(data: T, message?: string, statusCode?: number): IApiResponse<T>;
    static error(message?: string, statusCode?: number, errors?: any): IApiResponse<null>;
}
