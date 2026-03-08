import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const auditLog = (action: string, entity: string) => async (req: Request, _res: Response, next: NextFunction) => {
  if (req.clinicId) {
    await prisma.auditLog.create({
      data: {
        clinicId: req.clinicId,
        userId: req.user?.id,
        action,
        entity,
        entityId: typeof req.params.id === 'string' ? req.params.id : undefined,
        meta: { body: req.body }
      }
    });
  }
  next();
};
