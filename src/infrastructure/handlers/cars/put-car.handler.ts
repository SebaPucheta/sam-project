import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import CarRepositoryDynamoDB from "../../adapters/car-repository-mongoDB";
import SecretGetter from "../../../commons/secret-getter";
import { MiddyLambdaBuilder } from "../../../commons/infrastructure/middlewares/middy-lambda-builder";
import NotFoundError from "../../../commons/errors/not-found";
import UpdateCarDto from "../../../application/dtos/update-car.dto";
import UpdateCarUseCase from "../../../application/use-cases/cars/update-car";
import { carSchema } from "./schemas/put-car-body";
import { applyRequiredProperties, validate } from "../../../commons/validation-utils";
import BadRequestError from "../../../commons/errors/bad-request";
import { cleanObject } from "../../../commons/utils";

export class UpdateCarHandler {
  constructor(private readonly updateCarUseCase: UpdateCarUseCase) {}

  async handle(id: string, body: UpdateCarDto): Promise<APIGatewayProxyResultV2> {
    try {
      const car = cleanObject(body, ['brand', 'version', 'engine', 'licencePlate']);
      validate(car, applyRequiredProperties(carSchema));
      await this.updateCarUseCase.execute(id, car);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Car updated successfully" }),
      };
    } catch (error) {
      console.error(error);
      let response = {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
      };

      if (error instanceof BadRequestError) {
        response = {
          statusCode: 400,
          body: JSON.stringify({ message: error.message }),
        };
      }

      if (error instanceof NotFoundError) {
        response = {
          statusCode: 404,
          body: JSON.stringify({ message: error.message }),
        };
      }

      return response;
    }
  }
}

const updateCarHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResultV2> => {
  const secrets = new SecretGetter();
  const stringConnection = await secrets.getSecretValue("MONGODB_CONNECTION_STRING");
  const repository = new CarRepositoryDynamoDB();
  await repository.init(stringConnection);

  const handler = new UpdateCarHandler(new UpdateCarUseCase(repository));
  const id = event.pathParameters?.id;
  const body = event.body as unknown as UpdateCarDto;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Car ID is required" }),
    };
  }

  return await handler.handle(id, body);
};

export const handler = MiddyLambdaBuilder.getNewBuilder(updateCarHandler)
  .withEndpointMiddlewares({ parseBody: true })
  .build();