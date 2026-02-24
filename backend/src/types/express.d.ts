import { Role, SubscriptionStatus } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; clinicId: string; role: Role };
      clinicId?: string;
      subscriptionStatus?: SubscriptionStatus;
    }
  }
}

export {};
