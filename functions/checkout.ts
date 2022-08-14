import { Handler } from '@netlify/functions';
import dotenv from 'dotenv';
import { CheckoutRequest } from '../shared';
import { Handle, success } from './core/handlers';
import { checkout } from './products';

dotenv.config();

const handler: Handler = Handle(async (request: CheckoutRequest) => {
  const response = await checkout(request);

  return success(response);
});

export { handler };
