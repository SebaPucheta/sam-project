import { HttpMethod } from '../../../commons/models/http-method';
import { RouteConfig } from '../../../commons/models/route-config';
import { handler as LoginHandler } from './login.handler';
import { handler as SignUpHandler } from './sign-up.handler';

export const authRoutes: RouteConfig[] = [
  {
    path: '/login',
    method: HttpMethod.POST,
    withAuthorizer: false,
    handler: LoginHandler,
  },
  {
    path: '/sign-up',
    method: HttpMethod.POST,
    withAuthorizer: false,
    handler: SignUpHandler,
  },
];
