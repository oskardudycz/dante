import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | undefined;
const getStripe = async (publishKey: string): Promise<Stripe> => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishKey);
  }

  const stripe = await stripePromise;

  if (!stripe) {
    throw Error('Failed to initialise Stripe!');
  }

  return stripe;
};

export default getStripe;
