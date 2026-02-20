import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import { AppError } from '../utils/errors';

export const allowRoles = (...roles: Role[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw new AppError('Forbidden', 403);
  }
  next();
};
