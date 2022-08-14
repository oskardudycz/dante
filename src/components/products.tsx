import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxios from 'axios-hooks';
import {
  CheckoutRequest,
  CheckoutResponse,
  ProductWithPrice,
} from '../../shared';
import getStripe from '../core/web/stripe';

const Products = () => {
  const [products, setProducts] = useState<ProductWithPrice[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<ProductWithPrice[]>('/api/get-products')
      .then((result) => {
        if (result.status !== 200) {
          console.error('Error loading shopnotes');
          console.error(result);
          return;
        }
        setProducts(result.data);
        setLoaded(true);
      })
      .catch(console.error);
  }, []);

  const [_, executePost] = useAxios<CheckoutResponse, CheckoutRequest>(
    {
      url: '/api/checkout',
      method: 'POST',
    },
    { manual: true }
  );

  const addToCart = (priceIds: string) => {
    // Code to come here
    setCart([...cart, priceIds]);
    console.log(`added '${priceIds}' to cart!`);
  };

  const buyOne = (priceId: string): void => {
    executePost({
      data: {
        priceIds: [priceId],
      },
    })
      .then(async (response) => {
        const { redirectUrl, publishableKey } = response.data;

        const stripe = await getStripe(publishableKey);

        const { error } = await stripe.redirectToCheckout({
          sessionId: redirectUrl,
        });

        if (error) {
          console.error(error);
        }
      })
      .catch(console.error);
  };

  const checkOut = () => {
    // Code to come here
  };

  const formatPrice = ({
    amount,
    currency,
  }: {
    amount: number | null;
    currency: string | null;
  }) => {
    return `${amount !== null ? amount / 100 : ''} ${
      currency?.toLocaleUpperCase() ?? ''
    }`;
  };

  return (
    <>
      <div className="cart" onClick={() => checkOut()}>
        <div className="cart-icon">🛒</div>
        <div className="cart-badge">{cart.length}</div>
      </div>

      {loaded ? (
        <div className="products">
          {products.map((product) => (
            <div className="product" key={`${product.sku}-image`}>
              {/* <Image
                fileName={product.image.key}
                style={{ width: '100%' }}
                alt={product.name}
              /> */}
              <h2>{product.name}</h2>
              <p className="description">{product.description}</p>
              <p className="price">
                Price:
                <b>{formatPrice(product.price)}</b>
              </p>
              <button onClick={() => buyOne(product.price.id)}>Buy Now</button>
              <button onClick={() => addToCart(product.sku)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default Products;
