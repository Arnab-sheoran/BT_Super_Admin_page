import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const asyncWrapper = <T extends any[]>(fn: (...args: T) => Promise<any>) => {
  return (...args: T): Promise<any> => {
    return Promise.resolve(fn(...args)).catch((error: Error) => {
      throw error;
    });
  };
};