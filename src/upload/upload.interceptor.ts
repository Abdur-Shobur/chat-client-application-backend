import { mixin, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface UploadOptions {
  fieldName: string; // The field name in the form
  destination?: string; // Upload directory
  maxFiles?: number; // Maximum number of files (for multiple upload)
  maxFileSize?: number; // Maximum file size in bytes
  allowedMimeTypes?: string[]; // Allowed file types
}

export const createUploadInterceptor = (
  options: UploadOptions,
): Type<NestInterceptor> => {
  const {
    fieldName,
    destination = './uploads',
    maxFiles,
    maxFileSize,
    allowedMimeTypes,
  } = options;

  const multerOptions: MulterOptions = {
    storage: diskStorage({
      destination,
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (allowedMimeTypes && !allowedMimeTypes.includes(file.mimetype)) {
        return callback(new Error('Invalid file type'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: maxFileSize, // Set file size limit
    },
  };

  if (maxFiles) {
    return mixin(
      class extends FilesInterceptor(fieldName, maxFiles, multerOptions) {},
    );
  }

  return mixin(class extends FileInterceptor(fieldName, multerOptions) {});
};
