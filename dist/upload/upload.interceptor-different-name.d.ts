import { NestInterceptor, Type } from '@nestjs/common';
interface UploadOptions {
    fields: {
        name: string;
        maxCount: number;
    }[];
    destination?: string;
    maxFileSize?: number;
    allowedMimeTypes?: string[];
}
export declare const createUploadInterceptorDifferentName: (options: UploadOptions) => Type<NestInterceptor>;
export {};
