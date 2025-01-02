import { HttpMethod } from '../../../commons/models/http-method';
import { RouteConfig } from '../../../commons/models/route-config';
import { handler as PostCarHandler } from './post-car.handler';
import { handler as GetCarByIdHandler } from './get-car-by-id.handler';
import { handler as GetAllCarsHandler } from './get-all-cars.handler';
import { handler as UpdateCarHandler } from './put-car.handler';
import { handler as DeleteCarHandler } from './delete-car.handler';

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
  {
    path: '/cars/{id}',
    method: HttpMethod.PUT,
    withAuthorizer: true,
    handler: UpdateCarHandler,
  },
  {
    path: '/cars/{id}',
    method: HttpMethod.DELETE,
    withAuthorizer: true,
    handler: DeleteCarHandler,
  },
];
