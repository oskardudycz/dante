import { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import dotenv from 'dotenv';
dotenv.config();

export const parseEvent = <Request>(
  { body }: HandlerEvent,
  isOfRequestType: (body: unknown) => body is Request = (_): _ is Request =>
    true
): Request => {
  if (body === null) throw Error('Unexpected empty body');

  const parsed = JSON.parse(body) as unknown;

  if (!isOfRequestType(parsed)) throw Error('Wrong payload format');

  return parsed;
};

export const DEFAULT_HEADERS = {
  /* Required for CORS support to work */
  'Access-Control-Allow-Origin': 'http://localhost:8000',
  /* Required for cookies, authorization headers with HTTPS */
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Accept, Accept-Language, X-Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, DELETE',
  Accept: 'application/json',
};

export const trace = (): HandlerResponse => {
  return {
    statusCode: 200,
    headers: DEFAULT_HEADERS,
  };
};

export const success = <Response>(response: Response): HandlerResponse => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: DEFAULT_HEADERS,
  };
};

export const redirect = (url: string): HandlerResponse => {
  return {
    statusCode: 303,
    headers: { ...DEFAULT_HEADERS, Location: url },
  };
};

type RequestHandler<Request> =
  | ((request: Request) => Promise<HandlerResponse>)
  | (() => Promise<HandlerResponse>);

const isRequestHandlerWithoutParam = <Request>(
  x: RequestHandler<Request>
): x is () => Promise<HandlerResponse> => {
  return typeof x === 'function' && x.length === 0;
};

export const Handle = <Request>(handle: RequestHandler<Request>): Handler => {
  return (event: HandlerEvent): Promise<HandlerResponse> => {
    if (event.httpMethod === 'OPTIONS') return Promise.resolve(trace());

    if (isRequestHandlerWithoutParam<Request>(handle)) {
      return handle();
    }

    return handle(parseEvent<Request>(event));
  };
};
