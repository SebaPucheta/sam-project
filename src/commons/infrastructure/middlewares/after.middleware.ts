import { MiddlewareObj } from '@middy/core';
import { CORS_HEADERS } from '../../constants/constants';

export const afterMiddleware = (): MiddlewareObj => {
  const after = async (
    request: any,
  ): Promise<void> => {
    request.response = {
      ...request.response,
      headers: {
        ...request.response.headers,
        ...CORS_HEADERS,
      },
    };
  };

  return {
    after,
  };
};
