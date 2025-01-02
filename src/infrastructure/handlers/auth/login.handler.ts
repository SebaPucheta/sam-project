import { MiddyLambdaBuilder } from "../../../commons/infrastructure/middlewares/middy-lambda-builder";
import LoginDto from "../../../application/dtos/login.dto";
import WrongCredentialsError from "../../../application/errors/wrong-credentials";
import LoginUseCase from "../../../application/use-cases/auth/login";
import SecretGetter from "../../../commons/secret-getter";
import UserRepositoryDynamoDB from "../../adapters/user-repository-dynamoDB";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";

class LoginHandler {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async handle(params: LoginDto): Promise<APIGatewayProxyResultV2> {
    try {
      const access = await this.loginUseCase.excecute(params);
      const response = {
        statusCode: 200,
        body: JSON.stringify(access),
      };
  
      return response;
    } catch (error) {
      let response = {
        statusCode: 500,
        body: JSON.stringify({message: 'Internal Server Error'}),
      };

      if (error instanceof WrongCredentialsError) {
        response = {
          statusCode: 403,
          body: JSON.stringify({message: error.message}),
        };
      }

      return response;
    }
  }
}

const loginHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
  const secrets = new SecretGetter();
  const usersTableName = await secrets.getSecretValue('USERS_TABLE_NAME');
  const privateKey = await secrets.getSecretValue('AUTH_PRIVATE_KEY');
  const repository = new UserRepositoryDynamoDB(usersTableName || '');

  const useCase = new LoginUseCase(repository, privateKey || '');
  const handler = new LoginHandler(useCase);

  return await handler.handle(event.body as unknown as LoginDto);
};

export const handler = MiddyLambdaBuilder.getNewBuilder(
  loginHandler,
)
  .withEndpointMiddlewares({ parseBody: true })
  .build();