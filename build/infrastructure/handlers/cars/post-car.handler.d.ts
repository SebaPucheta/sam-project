import CreateCarDto from "../../../application/dtos/create-car.dto";
import CreateCarUseCase from "../../../application/use-cases/cars/create-car";
import { APIGatewayProxyResultV2 } from "aws-lambda";
export declare class PostCarHandler {
    private readonly createCarUseCase;
    constructor(createCarUseCase: CreateCarUseCase);
    handle(params: CreateCarDto): Promise<APIGatewayProxyResultV2>;
}
export declare const handler: import("@middy/core").MiddyfiedHandler<unknown, any, Error, import("aws-lambda").Context>;
