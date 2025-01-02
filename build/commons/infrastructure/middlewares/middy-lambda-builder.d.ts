import middy, { MiddlewareObj } from '@middy/core';
export declare class MiddyLambdaBuilder {
    private readonly handler;
    protected middlewares: any[];
    private commonAuthorizerMiddlewares;
    private commonEndpointMiddlewares;
    constructor(handler: any);
    static getNewBuilder(handler: any): MiddyLambdaBuilder;
    use(middleware: MiddlewareObj): this;
    withAuthorizerMiddlewares(): this;
    withEndpointMiddlewares(options?: {
        parsePath?: boolean;
        parseBody?: boolean;
    }): this;
    build(): middy.MiddyfiedHandler<unknown, any, Error, import("aws-lambda").Context>;
}
