import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/errors';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new AppError('Unauthorized', 401);

  const payload = jwt.verify(token, env.jwtAccessSecret) as {
    userId: string;
    clinicId: string;
    role: 'ADMIN' | 'DOCTOR' | 'MANAGER';
  };

  req.user = { id: payload.userId, clinicId: payload.clinicId, role: payload.role };
  req.clinicId = payload.clinicId;
  next();
};
