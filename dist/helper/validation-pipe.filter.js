"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomValidationError = getCustomValidationError;
exports.getAllConstraints = getAllConstraints;
const status_code_interface_1 = require("../type/status-code.interface");
function getCustomValidationError(message) {
    return {
        statusCode: status_code_interface_1.StatusCode.VALIDATION_ERROR,
        message,
        error: status_code_interface_1.StatusMessage.VALIDATION_ERROR,
    };
}
function getAllConstraints(errors) {
    const constraints = [];
    for (const error of errors) {
        if (error.constraints) {
            const constraintValues = Object.values(error.constraints);
            constraints.push(...constraintValues);
        }
        if (error.children) {
            const childConstraints = getAllConstraints(error.children);
            constraints.push(...childConstraints);
        }
    }
    console.log(constraints);
    return constraints;
}
//# sourceMappingURL=validation-pipe.filter.js.map