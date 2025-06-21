import { IApiResponse } from 'src/type';
export declare class ResponseService {
    success<T>(data: T, message?: string): IApiResponse<T>;
    error(message?: string, data?: any): IApiResponse<null>;
}
