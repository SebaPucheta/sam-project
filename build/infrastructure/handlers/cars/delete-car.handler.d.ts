import { APIGatewayProxyResultV2 } from "aws-lambda";
import DeleteCarUseCase from "../../../application/use-cases/cars/delete-car";
export declare class DeleteCarHandler {
    private readonly deleteCarUseCase;
    constructor(deleteCarUseCase: DeleteCarUseCase);
    handle(id: string): Promise<APIGatewayProxyResultV2>;
}
export declare const handler: import("@middy/core").MiddyfiedHandler<unknown, any, Error, import("aws-lambda").Context>;
