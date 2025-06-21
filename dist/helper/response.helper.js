"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    static success(data, message = 'Operation successful', statusCode = 200) {
        return {
            status: true,
            message,
            data,
            statusCode,
        };
    }
    static error(message = 'Something went wrong', statusCode = 400, errors = null) {
        return {
            status: false,
            message,
            statusCode,
            errors,
        };
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=response.helper.js.map