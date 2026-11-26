import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.utils.js';
import { HTTP_STATUS } from '../constants/http-status.constants.js';
import { config } from '../config/env.config.js';

export interface ErrorResponse {
  success: false;
  message: string;
  code: string;
  errors?: any[];
  stack?: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err);

  if (err instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      message: err.message,
      code: err.code,
      errors: err.errors,
    };

    if (config.NODE_ENV === 'development') {
      response.stack = err.stack;
    }

    res.status(err.statusCode).json(response);
    return;
  }

  if (err.name === 'ValidationError') {
    const response: ErrorResponse = {
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors: Object.values(err).map(e => ({
        field: e.path,
        message: e.message,
      })),
    };

    res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    return;
  }

  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    const response: ErrorResponse = {
      success: false,
      message: 'Invalid or expired token',
      code: 'INVALID_TOKEN',
    };

    res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
    return;
  }

  if (err.name === 'TokenExpiredError') {
    const response: ErrorResponse = {
      success: false,
      message: 'Token has expired',
      code: 'TOKEN_EXPIRED',
    };

    res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
    return;
  }

  const response: ErrorResponse = {
    success: false,
    message: config.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    code: 'INTERNAL_SERVER_ERROR',
  };

  if (config.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    code: 'ROUTE_NOT_FOUND',
  });
};