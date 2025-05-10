import { APIGatewayProxyResultV2 } from "aws-lambda";
import UpdateCarDto from "../../../application/dtos/update-car.dto";
import UpdateCarUseCase from "../../../application/use-cases/cars/update-car";
export declare class UpdateCarHandler {
    private readonly updateCarUseCase;
    constructor(updateCarUseCase: UpdateCarUseCase);
    handle(id: string, body: UpdateCarDto): Promise<APIGatewayProxyResultV2>;
}
export declare const handler: import("@middy/core").MiddyfiedHandler<unknown, any, Error, import("aws-lambda").Context>;
