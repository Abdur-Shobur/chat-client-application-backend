export declare class UploadController {
    uploadSingleFile(file: Express.Multer.File): Promise<{
        message: string;
        file: Express.Multer.File;
    }>;
    uploadMultipleFiles(files: Express.Multer.File[]): Promise<{
        message: string;
        files: Express.Multer.File[];
    }>;
}
