import Stripe from 'stripe';

export const webBaseUrl = process.env.WEB_BASE_URL || 'http://localhost:8888';

export const publishableKey =
  process.env.STRIPE_PUBLISHABLE_KEY ?? 'Dummy publishableKey';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy key', {
  apiVersion: '2022-11-15',
});
