"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const http_method_1 = require("../../../commons/models/http-method");
const post_car_handler_1 = require("./post-car.handler");
const get_car_by_id_handler_1 = require("./get-car-by-id.handler");
const get_all_cars_handler_1 = require("./get-all-cars.handler");
const put_car_handler_1 = require("./put-car.handler");
const delete_car_handler_1 = require("./delete-car.handler");
exports.carRoutes = [
    {
        path: '/cars',
        method: http_method_1.HttpMethod.POST,
        withAuthorizer: true,
        handler: post_car_handler_1.handler,
    },
    {
        path: '/cars/{carId}',
        method: http_method_1.HttpMethod.GET,
        withAuthorizer: true,
        handler: get_car_by_id_handler_1.handler,
    },
    {
        path: '/cars',
        method: http_method_1.HttpMethod.GET,
        withAuthorizer: true,
        handler: get_all_cars_handler_1.handler,
    },
    {
        path: '/cars/{id}',
        method: http_method_1.HttpMethod.PUT,
        withAuthorizer: true,
        handler: put_car_handler_1.handler,
    },
    {
        path: '/cars/{id}',
        method: http_method_1.HttpMethod.DELETE,
        withAuthorizer: true,
        handler: delete_car_handler_1.handler,
    },
];
//# sourceMappingURL=routes.js.map