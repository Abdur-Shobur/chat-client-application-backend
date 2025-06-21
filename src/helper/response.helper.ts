import { IApiResponse } from 'src/type';

export class ResponseHelper {
  static success<T>(
    data: T,
    message = 'Operation successful',
    statusCode = 200,
  ): IApiResponse<T> {
    return {
      status: true,
      message,
      data,
      statusCode,
    };
  }

  static error(
    message = 'Something went wrong',
    statusCode = 400,
    errors: any = null,
  ): IApiResponse<null> {
    return {
      status: false,
      message,
      statusCode,
      errors,
    };
  }
}
