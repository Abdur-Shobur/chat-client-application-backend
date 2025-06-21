import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { StatusCode, StatusMessage } from 'src/type/status-code.interface';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

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

    response.status(StatusCode.VALIDATION_ERROR).json({
      statusCode: StatusCode.VALIDATION_ERROR,
      status: false,
      message: StatusMessage.VALIDATION_ERROR,
      errors,
    });
  }
}
