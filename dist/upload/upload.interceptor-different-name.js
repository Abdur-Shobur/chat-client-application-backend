"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadInterceptorDifferentName = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const createUploadInterceptorDifferentName = (options) => {
    const { fields, destination = './uploads', maxFileSize, allowedMimeTypes, } = options;
    const multerOptions = {
        storage: (0, multer_1.diskStorage)({
            destination,
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
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
            fileSize: maxFileSize,
        },
    };
    return (0, common_1.mixin)(class extends (0, platform_express_1.FileFieldsInterceptor)(fields, multerOptions) {
    });
};
exports.createUploadInterceptorDifferentName = createUploadInterceptorDifferentName;
//# sourceMappingURL=upload.interceptor-different-name.js.map