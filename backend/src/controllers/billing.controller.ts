import { Request, Response } from 'express';
import { stripeService } from '../services/stripe.service';
import { ok } from '../utils/response';

export const billingController = {
  checkout: async (req: Request, res: Response) => {
    const session = await stripeService.createCheckoutSession(req.clinicId!, req.user?.id ?? '');
    return ok(res, { url: session.url }, 'Checkout session created');
  },
  webhook: async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;
    const eventType = await stripeService.processWebhook(signature, req.body as Buffer);
    return ok(res, { eventType }, 'Webhook processed');
  }
};
