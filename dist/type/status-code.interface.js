"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorTypes = exports.StatusMessage = exports.StatusCode = void 0;
exports.StatusCode = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    VALIDATION_ERROR: 422,
    INTERNAL_SERVER: 500,
};
exports.StatusMessage = {
    SUCCESS: 'Success',
    CREATED: 'Created Successfully',
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    CONFLICT: 'Conflict',
    VALIDATION_ERROR: 'Validation Failed',
    INVALID_INPUT: 'Invalid Input Data',
    INTERNAL_SERVER: 'Internal Server Error',
};
exports.ValidationErrorTypes = {
    REQUIRED: 'is required',
    INVALID_FORMAT: 'has invalid format',
    INVALID_LENGTH: 'has invalid length',
    ALREADY_EXISTS: 'already exists',
    INVALID_VALUE: 'has invalid value',
};
//# sourceMappingURL=status-code.interface.js.map