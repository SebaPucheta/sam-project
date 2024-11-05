import CreateCarDto from "../../application/dtos/create-car-dto";
import CreateCarUseCase from "../../application/use-cases/create-car";
import BadRequestError from "../../commons/errors/bad-request";
import SecretGetter from "../../commons/secret-getter";
import { applyRequiredProperties, validate } from "../../commons/validation-utils";
import CarRepositoryDynamoDB from "../adapters/car-repository-mongoDB";
import { carSchema } from "./schemas/post-car-body";

export class PostCarHandler {
  constructor(private readonly createCarUseCase: CreateCarUseCase) {}

  async handle(params: CreateCarDto) {
    try {
      validate(params, applyRequiredProperties(carSchema));
  
      await this.createCarUseCase.excecute(params);
      const response = {
        statusCode: 201,
      }
  
      return response;
    } catch (error) {
      console.log(error);
      let response = {
        statusCode: 500,
        body: JSON.stringify({message: 'Internal Server Error'}),
      }

      if (error instanceof BadRequestError) {
        response = {
          statusCode: 400,
          body: JSON.stringify({message: error.message}),
        }
      }

      return response;
    }
  }
}

export const postCarHandler = async (event: { body: string; }) => {
  const secrets = new SecretGetter();
  const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
  const repository = new CarRepositoryDynamoDB();
  await repository.init(stringConnection);

  const useCase = new CreateCarUseCase(repository)
  const handler = new PostCarHandler(useCase);
  const body = JSON.parse(event.body) as unknown as CreateCarDto

  return await handler.handle(body);
}