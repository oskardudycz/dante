import React, { useState, useEffect } from 'react';
import { loadStripe, RedirectToCheckoutOptions } from '@stripe/stripe-js';
import axios from 'axios';

type ProductsProps = {
  stripe: StripeCheckoutOptions;
};

type StripeCheckoutOptions = {
  publishableKey: string;
  productPriceId: string;
};

type Product = {
  sku: string;
  name: string;
  description: string;
  image: {
    url: string;
    key: string;
  };
  amount: number;
  currency: string;
};

const Products = ({
  stripe: { publishableKey, productPriceId },
}: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cart /*, setCart*/] = useState([]);

  useEffect(() => {
    axios
      .get<Product[]>('http://localhost:8888/api/get-products')
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

  const addToCart = async (sku: string) => {
    // Code to come here
    console.log(`added '${sku}' to cart!`);

    const productToCheckout = { price: productPriceId, quantity: 3 };

    const checkoutOptions: RedirectToCheckoutOptions = {
      mode: 'payment',
      lineItems: [productToCheckout],
      successUrl: `http://localhost:8000/`,
      cancelUrl: `http://localhost:8000/`,
    };

    const stripe = await loadStripe(publishableKey);
    if (stripe === null) {
      throw Error('Stripe connection error!');
    }
    const result = await stripe.redirectToCheckout(checkoutOptions);
    console.log('RESULT!' + JSON.stringify(result));
  };

  const buyOne = (sku: string) => {
    // Code to come here
    console.log(`bought '${sku}'!`);
  };

  const checkOut = () => {
    // Code to come here
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
                Price: <b>${product.amount}</b>
              </p>
              <button onClick={() => buyOne(product.sku)}>Buy Now</button>
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
