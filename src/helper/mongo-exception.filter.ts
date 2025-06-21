import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const formatErrorResponse = (
      statusCode: number,
      message: string,
      errors: { field?: string; message: string }[] = [],
    ) => {
      return response.status(statusCode).json({
        statusCode,
        message,
        errors,
        status: false,
      });
    };

    // Validation Pipe Errors (class-validator)
    if (Array.isArray(exception) && exception[0]?.constraints) {
      const errors = exception.map((err) => ({
        field: err.property,
        message: Object.values(err.constraints).join(', '),
      }));

      return formatErrorResponse(
        HttpStatus.BAD_REQUEST,
        'Validation Input Error',
        errors,
      );
    }

    // Mongoose ValidationError
    if (exception.name === 'ValidationError') {
      const errors = Object.entries(exception.errors).map(([field, error]) => {
        let message = (error as any).message;

        // Check if it's a CastError or contains a nested CastError (like for [ObjectId])
        if ((error as any).name === 'CastError') {
          message = `Invalid ID format.`;
        } else if ((error as any).reason?.name === 'CastError') {
          message = `Invalid ID format.`;
        }

        return {
          field,
          message,
        };
      });

      return formatErrorResponse(
        HttpStatus.BAD_REQUEST,
        'Validation Error',
        errors,
      );
    }

    // Mongoose CastError (Invalid ObjectId)
    if (
      exception.name === 'CastError' &&
      ['ObjectId', '[ObjectId]'].includes(exception.kind)
    ) {
      return formatErrorResponse(HttpStatus.BAD_REQUEST, 'Invalid ID format', [
        {
          field: exception.path,
          message: `The provided value "${exception.value}" is not a valid ObjectId.`,
        },
      ]);
    }

    // Mongoose Duplicate Key Error (11000)
    if (exception.code === 11000) {
      const keyValue = exception.keyValue || {};
      const field = Object.keys(keyValue)[0];
      const value = keyValue[field];

      return formatErrorResponse(HttpStatus.CONFLICT, 'Duplicate Value', [
        {
          field,
          message: `The value "${value}" already exists.`,
        },
      ]);
    }

    // NestJS HttpException Handling
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (status === HttpStatus.BAD_REQUEST && exceptionResponse) {
        const { message, error } = exceptionResponse as {
          message: string[] | string;
          error: string;
        };

        const errors = Array.isArray(message)
          ? message.map((msg) => ({ message: msg }))
          : [{ message }];

        return formatErrorResponse(
          HttpStatus.BAD_REQUEST,
          error || 'Bad Request',
          errors,
        );
      }

      return formatErrorResponse(
        status,
        exception.message || 'An error occurred',
      );
    }

    // Fallback for unhandled errors
    console.error(JSON.stringify(exception, null, 2));
    return formatErrorResponse(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error',
      [{ message: 'Something went wrong' }],
    );
  }
}
