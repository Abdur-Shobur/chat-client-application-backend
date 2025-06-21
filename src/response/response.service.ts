import { Injectable } from '@nestjs/common';
import { IApiResponse } from 'src/type';

@Injectable()
export class ResponseService {
  success<T>(data: T, message = 'Operation successful'): IApiResponse<T> {
    return {
      status: true,
      message,
      data,
      statusCode: 200,
    };
  }

  error(
    message = 'Something went wrong',
    data: any = null,
  ): IApiResponse<null> {
    return {
      status: false,
      message,
      data,
      statusCode: 500,
      errors: {},
    };
  }
}
