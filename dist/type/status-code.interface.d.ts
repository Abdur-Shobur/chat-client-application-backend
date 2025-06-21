export declare const StatusCode: {
    readonly SUCCESS: 200;
    readonly CREATED: 201;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly VALIDATION_ERROR: 422;
    readonly INTERNAL_SERVER: 500;
};
export declare const StatusMessage: {
    readonly SUCCESS: "Success";
    readonly CREATED: "Created Successfully";
    readonly BAD_REQUEST: "Bad Request";
    readonly UNAUTHORIZED: "Unauthorized";
    readonly FORBIDDEN: "Forbidden";
    readonly NOT_FOUND: "Not Found";
    readonly CONFLICT: "Conflict";
    readonly VALIDATION_ERROR: "Validation Failed";
    readonly INVALID_INPUT: "Invalid Input Data";
    readonly INTERNAL_SERVER: "Internal Server Error";
};
export declare const ValidationErrorTypes: {
    readonly REQUIRED: "is required";
    readonly INVALID_FORMAT: "has invalid format";
    readonly INVALID_LENGTH: "has invalid length";
    readonly ALREADY_EXISTS: "already exists";
    readonly INVALID_VALUE: "has invalid value";
};
