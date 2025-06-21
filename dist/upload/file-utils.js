"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
const fs = require("fs");
const path = require("path");
class FileUtils {
    static deleteFile(filePath) {
        try {
            const absolutePath = path.resolve(filePath);
            if (fs.existsSync(absolutePath)) {
                fs.unlinkSync(absolutePath);
                console.log(`File deleted: ${absolutePath}`);
            }
            else {
                console.warn(`File not found: ${absolutePath}`);
            }
        }
        catch (error) {
            console.error(`Error deleting file: ${filePath}`, error);
        }
    }
}
exports.FileUtils = FileUtils;
//# sourceMappingURL=file-utils.js.map