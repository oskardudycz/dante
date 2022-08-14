import { CheckoutRequest, CheckoutResponse } from '../../shared';
import { publishableKey, stripe, webBaseUrl } from '../core/stripe';

export const checkout = async (
  request: CheckoutRequest
): Promise<CheckoutResponse> => {
  const { priceIds } = request;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    billing_address_collection: 'auto',
    success_url: `${webBaseUrl}/success`,
    cancel_url: webBaseUrl,
    line_items: priceIds.map((price) => {
      return {
        price,
        quantity: 1,
      };
    }),
  });

  if (!session.url) throw Error('Stripe URL not set!');

  return {
    redirectUrl: session.id,
    publishableKey,
  };
};
