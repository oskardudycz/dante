import { Handler } from '@netlify/functions';
import { Handle, success } from './core/handlers';
import { getProductsWithPrices } from './products';

const handler: Handler = Handle(async () => {
  const response = await getProductsWithPrices();
  return success(response);
});

export { handler };
