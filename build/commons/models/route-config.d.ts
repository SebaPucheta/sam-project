import { HttpMethod } from './http-method';
import middy from '@middy/core';
export interface RouteConfig {
    path: string;
    method: HttpMethod;
    withAuthorizer?: boolean;
    handler: middy.MiddyfiedHandler;
}
