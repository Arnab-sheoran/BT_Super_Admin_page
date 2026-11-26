import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.config.js';
import { AppError } from '../utils/app-error.utils.js';
import { HTTP_STATUS } from '../constants/http-status.constants.js';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  tenantId?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const DEV_BYPASS_USER: JwtPayload = {
  userId: 'dev-super-admin',
  email: 'dev@command-centre.local',
  role: 'SUPER_ADMIN',
};

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  if (config.NODE_ENV === 'development' && config.DEV_AUTH_BYPASS) {
    req.user = DEV_BYPASS_USER;
    next();
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new AppError('Authentication required', HTTP_STATUS.UNAUTHORIZED, 'AUTH_REQUIRED'));
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET, {
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE,
    }) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token has expired', HTTP_STATUS.UNAUTHORIZED, 'TOKEN_EXPIRED'));
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', HTTP_STATUS.UNAUTHORIZED, 'INVALID_TOKEN'));
      return;
    }
    next(new AppError('Authentication failed', HTTP_STATUS.UNAUTHORIZED, 'AUTH_FAILED'));
  }
};

export const authorizeSuperAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    next(new AppError('Authentication required', HTTP_STATUS.UNAUTHORIZED, 'AUTH_REQUIRED'));
    return;
  }

  if (req.user.role !== 'SUPER_ADMIN') {
    next(new AppError('Super Admin access required', HTTP_STATUS.FORBIDDEN, 'SUPER_ADMIN_REQUIRED'));
    return;
  }

  next();
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET, {
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE,
    }) as JwtPayload;

    req.user = decoded;
  } catch {
    // Ignore invalid tokens for optional auth
  }

  next();
};