import { Handler } from '@netlify/functions';

const handler: Handler = () => {
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  });
};

export { handler };
