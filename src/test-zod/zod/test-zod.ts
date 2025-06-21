import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' }) // Set custom "required" message
    .min(1, 'Name is required'), // Ensure non-empty string
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long'),
});
