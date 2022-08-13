import { Handler } from '@netlify/functions';
import products from './data/products.json';

const headers = {
  /* Required for CORS support to work */
  'Access-Control-Allow-Origin': 'http://localhost:8000',
  /* Required for cookies, authorization headers with HTTPS */
  'Access-Control-Allow-Credentials': true,
};

const handler: Handler = () => {
  return Promise.resolve({
    statusCode: 200,
    headers,
    body: JSON.stringify(products),
  });
};

export { handler };
