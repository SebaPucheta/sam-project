import middy, { MiddlewareObj } from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpUrlEncodePathParser from '@middy/http-urlencode-path-parser';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { httpErrorMiddleware } from './http-error.middleware';
import { afterMiddleware } from './after.middleware';

export class MiddyLambdaBuilder {
  protected middlewares: any[] = [];

  private commonAuthorizerMiddlewares = [httpHeaderNormalizer()];
  private commonEndpointMiddlewares = [
    httpHeaderNormalizer(),
    httpErrorMiddleware(),
    afterMiddleware(),
  ];

  constructor(private readonly handler: any) {}

  public static getNewBuilder(handler: any): MiddyLambdaBuilder {
    return new MiddyLambdaBuilder(handler);
  }

  public use(middleware: MiddlewareObj): this {
    this.middlewares.push(middleware);
    return this;
  }

  public withAuthorizerMiddlewares(): this {
    this.middlewares.push(...this.commonAuthorizerMiddlewares);
    return this;
  }

  public withEndpointMiddlewares(
    options: {
      parsePath?: boolean;
      parseBody?: boolean;
    } = {
      parsePath: false,
      parseBody: false,
    },
  ): this {
    if (options.parsePath) {
      this.middlewares.push(httpUrlEncodePathParser());
    }
    if (options.parseBody) {
      this.middlewares.push(httpJsonBodyParser());
    }
    this.middlewares.push(...this.commonEndpointMiddlewares);
    return this;
  }

  public build() {
    return middy().use(this.middlewares).handler(this.handler);
  }
}
