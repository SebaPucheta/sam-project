import middy from '@middy/core';
import httpRouterHandler from '@middy/http-router';
import { routes } from './routes';

export const handler = middy().handler(httpRouterHandler(routes));
