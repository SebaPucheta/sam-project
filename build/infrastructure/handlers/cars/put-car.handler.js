"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.UpdateCarHandler = void 0;
const car_repository_mongoDB_1 = __importDefault(require("../../adapters/car-repository-mongoDB"));
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const middy_lambda_builder_1 = require("../../../commons/infrastructure/middlewares/middy-lambda-builder");
const not_found_1 = __importDefault(require("../../../commons/errors/not-found"));
const update_car_1 = __importDefault(require("../../../application/use-cases/cars/update-car"));
const put_car_body_1 = require("./schemas/put-car-body");
const validation_utils_1 = require("../../../commons/validation-utils");
const bad_request_1 = __importDefault(require("../../../commons/errors/bad-request"));
const utils_1 = require("../../../commons/utils");
class UpdateCarHandler {
    constructor(updateCarUseCase) {
        this.updateCarUseCase = updateCarUseCase;
    }
    async handle(id, body) {
        try {
            const car = (0, utils_1.cleanObject)(body, ['brand', 'version', 'engine', 'licencePlate']);
            (0, validation_utils_1.validate)(car, (0, validation_utils_1.applyRequiredProperties)(put_car_body_1.carSchema));
            await this.updateCarUseCase.execute(id, car);
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Car updated successfully" }),
            };
        }
        catch (error) {
            console.error(error);
            let response = {
                statusCode: 500,
                body: JSON.stringify({ message: "Internal Server Error" }),
            };
            if (error instanceof bad_request_1.default) {
                response = {
                    statusCode: 400,
                    body: JSON.stringify({ message: error.message }),
                };
            }
            if (error instanceof not_found_1.default) {
                response = {
                    statusCode: 404,
                    body: JSON.stringify({ message: error.message }),
                };
            }
            return response;
        }
    }
}
exports.UpdateCarHandler = UpdateCarHandler;
const updateCarHandler = async (event) => {
    const secrets = new secret_getter_1.default();
    const stringConnection = await secrets.getSecretValue("MONGODB_CONNECTION_STRING");
    const repository = new car_repository_mongoDB_1.default();
    await repository.init(stringConnection);
    const handler = new UpdateCarHandler(new update_car_1.default(repository));
    const id = event.pathParameters?.id;
    const body = event.body;
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Car ID is required" }),
        };
    }
    return await handler.handle(id, body);
};
exports.handler = middy_lambda_builder_1.MiddyLambdaBuilder.getNewBuilder(updateCarHandler)
    .withEndpointMiddlewares({ parseBody: true })
    .build();
//# sourceMappingURL=put-car.handler.js.map