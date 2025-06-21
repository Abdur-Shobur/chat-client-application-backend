import {
  Injectable,
  mixin,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Type,
} from '@nestjs/common';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface UploadOptions {
  fields: { name: string; maxCount: number }[]; // Multiple fields with different names
  destination?: string; // Upload directory
  maxFileSize?: number; // Maximum file size in bytes
  allowedMimeTypes?: string[]; // Allowed file types
}

export const createUploadInterceptorDifferentName = (
  options: UploadOptions,
): Type<NestInterceptor> => {
  const {
    fields,
    destination = './uploads',
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

  return mixin(class extends FileFieldsInterceptor(fields, multerOptions) {});
};
