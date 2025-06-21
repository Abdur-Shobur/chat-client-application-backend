"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const status_code_interface_1 = require("../type/status-code.interface");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        let errors = {};
        if (typeof exceptionResponse === 'object' && exceptionResponse['message']) {
            const messages = exceptionResponse['message'];
            if (Array.isArray(messages)) {
                errors = messages.reduce((acc, curr) => {
                    const [key, ...rest] = curr.split(' ');
                    acc[key.toLowerCase()] = rest.join(' ');
                    return acc;
                }, {});
            }
        }
        response.status(status_code_interface_1.StatusCode.VALIDATION_ERROR).json({
            statusCode: status_code_interface_1.StatusCode.VALIDATION_ERROR,
            status: false,
            message: status_code_interface_1.StatusMessage.VALIDATION_ERROR,
            errors,
        });
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], ValidationExceptionFilter);
//# sourceMappingURL=validation-exception.filter.js.map