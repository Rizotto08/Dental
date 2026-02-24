import Stripe from 'stripe';
import { env } from '../config/env';
import { prisma } from '../config/prisma';

const stripe = new Stripe(env.stripeSecretKey || 'sk_test_stub');

export const stripeService = {
  createCheckoutSession: async (clinicId: string, email: string) => {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: process.env.STRIPE_PRICE_ID ?? '', quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      success_url: process.env.STRIPE_SUCCESS_URL ?? 'https://example.com/success',
      cancel_url: process.env.STRIPE_CANCEL_URL ?? 'https://example.com/cancel',
      metadata: { clinicId }
    });
    return session;
  },
  processWebhook: async (signature: string, payload: Buffer) => {
    const event = stripe.webhooks.constructEvent(payload, signature, env.stripeWebhookSecret);
    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription;
      const clinicId = sub.metadata?.clinicId;
      if (clinicId) {
        await prisma.clinic.update({
          where: { id: clinicId },
          data: {
            stripeSubscriptionId: sub.id,
            subscriptionStatus: mapStripeStatus(sub.status)
          }
        });
      }
    }
    return event.type;
  }
};

function mapStripeStatus(status: Stripe.Subscription.Status) {
  switch (status) {
    case 'trialing':
      return 'TRIALING';
    case 'active':
      return 'ACTIVE';
    case 'past_due':
      return 'PAST_DUE';
    case 'canceled':
      return 'CANCELED';
    default:
      return 'UNPAID';
  }
}
