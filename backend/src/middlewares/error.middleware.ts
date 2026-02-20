import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../config/logger';

export const errorHandler = (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  logger.error({ message: err.message, stack: err.stack });
  res.status(statusCode).json({ success: false, message: err.message });
};
