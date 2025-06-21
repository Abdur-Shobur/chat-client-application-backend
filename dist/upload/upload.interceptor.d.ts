import { NestInterceptor, Type } from '@nestjs/common';
interface UploadOptions {
    fieldName: string;
    destination?: string;
    maxFiles?: number;
    maxFileSize?: number;
    allowedMimeTypes?: string[];
}
export declare const createUploadInterceptor: (options: UploadOptions) => Type<NestInterceptor>;
export {};
