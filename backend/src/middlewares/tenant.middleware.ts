import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors';

export const tenantMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user?.clinicId) {
    throw new AppError('Clinic context missing', 400);
  }
  req.clinicId = req.user.clinicId;
  next();
};
