import { MiddyLambdaBuilder } from "../../../commons/infrastructure/middlewares/middy-lambda-builder";
import CreateCarDto from "../../../application/dtos/create-car-dto";
import CreateCarUseCase from "../../../application/use-cases/create-car";
import BadRequestError from "../../../commons/errors/bad-request";
import SecretGetter from "../../../commons/secret-getter";
import { applyRequiredProperties, validate } from "../../../commons/validation-utils";
import CarRepositoryDynamoDB from "../../adapters/car-repository-mongoDB";
import { carSchema } from "./schemas/post-car-body";
import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";

export class PostCarHandler {
  constructor(private readonly createCarUseCase: CreateCarUseCase) {}

  async handle(params: CreateCarDto): Promise<APIGatewayProxyResultV2> {
    try {
      validate(params, applyRequiredProperties(carSchema));
  
      await this.createCarUseCase.excecute(params);
      return {
        statusCode: 201,
        body: '{}'
      };
    } catch (error) {
      let response = {
        statusCode: 500,
        body: JSON.stringify({message: 'Internal Server Error'}),
      };

      if (error instanceof BadRequestError) {
        response = {
          statusCode: 400,
          body: JSON.stringify({message: error.message}),
        };
      }

      return response;
    }
  }
}

const postCarHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResultV2> => {
  const secrets = new SecretGetter();
  const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
  const repository = new CarRepositoryDynamoDB();
  await repository.init(stringConnection);

  const useCase = new CreateCarUseCase(repository);
  const handler = new PostCarHandler(useCase);
  const body = event.body as unknown as CreateCarDto;

  return await handler.handle(body);
};

export const handler = MiddyLambdaBuilder.getNewBuilder(
  postCarHandler,
)
  .withEndpointMiddlewares({ parseBody: true })
  .build();