import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  // Generates a unique filename
  generateFilename(file: Express.Multer.File): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    return `${file.fieldname}-${uniqueSuffix}${ext}`;
  }

  // Returns Multer storage configuration
  getMulterStorage(destination: string) {
    return diskStorage({
      destination,
      filename: (req, file, callback) => {
        const filename = this.generateFilename(file);
        callback(null, filename);
      },
    });
  }
}
