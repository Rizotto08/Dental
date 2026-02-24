import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { ok } from '../utils/response';

export const adminController = {
  metrics: async (_req: Request, res: Response) => {
    const [activeClinics, subscriptions] = await Promise.all([
      prisma.clinic.count({ where: { subscriptionStatus: 'ACTIVE' } }),
      prisma.subscription.findMany({ where: { status: 'ACTIVE' } })
    ]);

    const mrr = subscriptions.length * Number(process.env.MONTHLY_PRICE ?? 99);
    return ok(res, { activeClinics, mrr }, 'SaaS metrics');
  }
};
