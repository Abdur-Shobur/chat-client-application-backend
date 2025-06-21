import { ValidationError } from 'class-validator';
export declare function getCustomValidationError(message: string | string[]): {
    statusCode: 422;
    message: string | string[];
    error: "Validation Failed";
};
export declare function getAllConstraints(errors: ValidationError[]): string[];
