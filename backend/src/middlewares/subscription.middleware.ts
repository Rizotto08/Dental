import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { AppError } from '../utils/errors';

const ALLOWED = ['TRIALING', 'ACTIVE'];

export const subscriptionGuard = async (req: Request, _res: Response, next: NextFunction) => {
  const clinicId = req.clinicId;
  if (!clinicId) throw new AppError('Clinic not found', 404);

  const clinic = await prisma.clinic.findUnique({ select: { subscriptionStatus: true }, where: { id: clinicId } });
  if (!clinic || !ALLOWED.includes(clinic.subscriptionStatus)) {
    throw new AppError('Subscription inactive. Payment required.', 402);
  }
  req.subscriptionStatus = clinic.subscriptionStatus;
  next();
};
