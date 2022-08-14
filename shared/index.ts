/////////////////////
/// GET Products
/////////////////////
export type Product = {
  sku: string;
  name: string;
  description: string | null;
  image: {
    url: string;
    key: string;
  } | null;
};

export type ProductWithPrice = Product & {
  price: {
    id: string;
    amount: number | null;
    currency: string | null;
  };
};

export type GetProductsResponse = ProductWithPrice[];

/////////////////////
/// CHECKOUT
/////////////////////
export type CheckoutRequest = {
  priceIds: string[];
};

export type CheckoutResponse = {
  redirectUrl: string;
  publishableKey: string;
};
