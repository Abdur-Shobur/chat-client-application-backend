export declare class UploadService {
    generateFilename(file: Express.Multer.File): string;
    getMulterStorage(destination: string): import("multer").StorageEngine;
}
