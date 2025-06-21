"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name is required'),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long'),
});
//# sourceMappingURL=test-zod.js.map