import * as fs from 'fs';
import * as path from 'path';

export class FileUtils {
  /**
   * Deletes a file from the file system.
   * @param filePath - The relative or absolute path of the file to be deleted.
   */
  static deleteFile(filePath: string): void {
    try {
      const absolutePath = path.resolve(filePath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        console.log(`File deleted: ${absolutePath}`);
      } else {
        console.warn(`File not found: ${absolutePath}`);
      }
    } catch (error) {
      console.error(`Error deleting file: ${filePath}`, error);
    }
  }
}
