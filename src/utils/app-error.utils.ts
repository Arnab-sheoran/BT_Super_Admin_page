export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly errors?: any[];
  public isOperational: boolean;

  constructor(message: string, statusCode: number, code: string, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, code: string = 'BAD_REQUEST', errors?: any[]): AppError {
    return new AppError(message, 400, code, errors);
  }

  static unauthorized(message: string, code: string = 'UNAUTHORIZED', errors?: any[]): AppError {
    return new AppError(message, 401, code, errors);
  }

  static forbidden(message: string, code: string = 'FORBIDDEN', errors?: any[]): AppError {
    return new AppError(message, 403, code, errors);
  }

  static notFound(message: string, code: string = 'NOT_FOUND', errors?: any[]): AppError {
    return new AppError(message, 404, code, errors);
  }

  static conflict(message: string, code: string = 'CONFLICT', errors?: any[]): AppError {
    return new AppError(message, 409, code, errors);
  }

  static internal(message: string, code: string = 'INTERNAL_SERVER_ERROR', errors?: any[]): AppError {
    const error = new AppError(message, 500, code, errors);
    error.isOperational = false;
    return error;
  }

  static tooManyRequests(message: string, code: string = 'TOO_MANY_REQUESTS', errors?: any[]): AppError {
    return new AppError(message, 429, code, errors);
  }
}