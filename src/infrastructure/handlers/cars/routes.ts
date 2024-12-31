import { HttpMethod } from '../../../commons/models/http-method';
import { RouteConfig } from '../../../commons/models/route-config';
import { handler as PostCarHandler } from './post-car';
import { handler as GetCarByIdHandler } from './get-car-by-id';
import { handler as GetAllCarsHandler } from './get-all-cars';

export const carRoutes: RouteConfig[] = [
  {
    path: '/cars',
    method: HttpMethod.POST,
    withAuthorizer: true,
    handler: PostCarHandler,
  },
  {
    path: '/cars/{carId}',
    method: HttpMethod.GET,
    withAuthorizer: true,
    handler: GetCarByIdHandler,
  },
  {
    path: '/cars',
    method: HttpMethod.GET,
    withAuthorizer: true,
    handler: GetAllCarsHandler,
  },
];
