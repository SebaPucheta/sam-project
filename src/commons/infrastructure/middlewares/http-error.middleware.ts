import { normalizeHttpResponse } from '@middy/util';
import { MiddlewareObj } from '@middy/core';

const defaults = {
  fallbackMessage: null,
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const httpErrorMiddleware = (opts = {}): MiddlewareObj => {
  const options = { ...defaults, ...opts };

   
  const onError = async (
    request: any,
  ): Promise<void> => {
    if (request.response !== undefined) {
      return;
    }
    // Set default expose value, only passes in when there is an override
    if (request.error.statusCode && request.error.expose === undefined) {
      request.error.expose = !!request.error.statusCode;
    }

    console.error(request.error)
    // Non-http error OR expose set to false
    if (!request.error.statusCode || !request.error.expose) {
      request.response = {
        statusCode: 500,
        body: JSON.stringify({
          message: options.fallbackMessage ?? 'concha de la lora',
        }),
      };
    }

    if (request.error.expose) {
      normalizeHttpResponse(request);

      const { statusCode, message, headers, cause } = request.error;

      const body = JSON.stringify({
        message,
        cause,
      });

      request.response = {
        ...request.response,
        statusCode,
        body,
        headers: {
          ...headers,
          ...request.response.headers,
          'Content-Type': 'application/json',
          ...CORS_HEADERS,
        },
      };
    }
  };

  return {
    onError,
  };
};
