import { ValidationError } from 'class-validator';
import { StatusCode, StatusMessage } from 'src/type/status-code.interface';

export function getCustomValidationError(message: string | string[]) {
  return {
    statusCode: StatusCode.VALIDATION_ERROR,
    message,
    error: StatusMessage.VALIDATION_ERROR,
  };
}
export function getAllConstraints(errors: ValidationError[]): string[] {
  const constraints: string[] = [];

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
