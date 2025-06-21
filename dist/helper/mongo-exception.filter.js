"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let MongooseExceptionFilter = class MongooseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const formatErrorResponse = (statusCode, message, errors = []) => {
            return response.status(statusCode).json({
                statusCode,
                message,
                errors,
                status: false,
            });
        };
        if (Array.isArray(exception) && exception[0]?.constraints) {
            const errors = exception.map((err) => ({
                field: err.property,
                message: Object.values(err.constraints).join(', '),
            }));
            return formatErrorResponse(common_1.HttpStatus.BAD_REQUEST, 'Validation Input Error', errors);
        }
        if (exception.name === 'ValidationError') {
            const errors = Object.entries(exception.errors).map(([field, error]) => {
                let message = error.message;
                if (error.name === 'CastError') {
                    message = `Invalid ID format.`;
                }
                else if (error.reason?.name === 'CastError') {
                    message = `Invalid ID format.`;
                }
                return {
                    field,
                    message,
                };
            });
            return formatErrorResponse(common_1.HttpStatus.BAD_REQUEST, 'Validation Error', errors);
        }
        if (exception.name === 'CastError' &&
            ['ObjectId', '[ObjectId]'].includes(exception.kind)) {
            return formatErrorResponse(common_1.HttpStatus.BAD_REQUEST, 'Invalid ID format', [
                {
                    field: exception.path,
                    message: `The provided value "${exception.value}" is not a valid ObjectId.`,
                },
            ]);
        }
        if (exception.code === 11000) {
            const keyValue = exception.keyValue || {};
            const field = Object.keys(keyValue)[0];
            const value = keyValue[field];
            return formatErrorResponse(common_1.HttpStatus.CONFLICT, 'Duplicate Value', [
                {
                    field,
                    message: `The value "${value}" already exists.`,
                },
            ]);
        }
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (status === common_1.HttpStatus.BAD_REQUEST && exceptionResponse) {
                const { message, error } = exceptionResponse;
                const errors = Array.isArray(message)
                    ? message.map((msg) => ({ message: msg }))
                    : [{ message }];
                return formatErrorResponse(common_1.HttpStatus.BAD_REQUEST, error || 'Bad Request', errors);
            }
            return formatErrorResponse(status, exception.message || 'An error occurred');
        }
        console.error(JSON.stringify(exception, null, 2));
        return formatErrorResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error', [{ message: 'Something went wrong' }]);
    }
};
exports.MongooseExceptionFilter = MongooseExceptionFilter;
exports.MongooseExceptionFilter = MongooseExceptionFilter = __decorate([
    (0, common_1.Catch)()
], MongooseExceptionFilter);
//# sourceMappingURL=mongo-exception.filter.js.map