import Stripe from 'stripe';
import { GetProductsResponse, ProductWithPrice } from '../../shared';
import { stripe } from '../core/stripe';

export const getProductsWithPrices = async (): Promise<GetProductsResponse> => {
  const productPriceData = await stripe.products.list({
    expand: ['data.default_price'], // 🎉 Give me the product data too!
  });

  console.log(`RESPONSE: ${JSON.stringify(productPriceData)}`);
  return productPriceData.data
    .map((product) => {
      if (!isPriceObject(product.default_price)) return;
      const firstImage = product.images.length > 0 ? product.images[0] : null;

      return {
        sku: product.id,
        name: product.name,
        description: product.description,
        image:
          firstImage !== null
            ? {
                url: firstImage,
                key: firstImage,
              }
            : null,
        price: {
          id: product.default_price.id,
          amount: product.default_price.unit_amount,
          currency: product.default_price.currency,
        },
      };
    })
    .filter((product) => !!product) as ProductWithPrice[];
};

const isPriceObject = (
  price: string | Stripe.Price | null | undefined
): price is Stripe.Price => {
  return price != null && typeof price !== 'string' && 'id' in price;
};
