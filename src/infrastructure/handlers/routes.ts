import { RouteConfig } from '../../commons/models/route-config';
import { carRoutes } from './cars/routes';
import { authRoutes } from './auth/route';

export const routes: RouteConfig[] = [
  ...carRoutes,
  ...authRoutes
];
