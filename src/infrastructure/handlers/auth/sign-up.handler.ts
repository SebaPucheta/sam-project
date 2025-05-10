import { MiddyLambdaBuilder } from "../../../commons/infrastructure/middlewares/middy-lambda-builder";
import SignUpDto from "../../../application/dtos/sign-up.dto";
import SignUpUseCase from "../../../application/use-cases/auth/sign-up";
import SecretGetter from "../../../commons/secret-getter";
import UserRepositoryDynamoDB from "../../adapters/user-repository-dynamoDB";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";

class SignUpHandler {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle(params: SignUpDto): Promise<APIGatewayProxyResultV2> {
    const access = await this.signUpUseCase.excecute(params);
    const response = {
      statusCode: 200,
      body: JSON.stringify(access),
    };

    return response;
  }
}

const signUpHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
  const secrets = new SecretGetter();
  const usersTableName = await secrets.getSecretValue('USERS_TABLE_NAME');
  const repository = new UserRepositoryDynamoDB(usersTableName || '');

  const privateKey = await secrets.getSecretValue('AUTH_PRIVATE_KEY');
  const saltRounds = await secrets.getSecretValue('SALT_ROUNDS');
  const useCase = new SignUpUseCase(
    repository,
    privateKey || '',
    Number(saltRounds) || 1,
  );
  const handler = new SignUpHandler(useCase);

  return await handler.handle(event.body as unknown as SignUpDto);
};

export const handler = MiddyLambdaBuilder.getNewBuilder(
  signUpHandler,
)
  .withEndpointMiddlewares({ parseBody: true })
  .build();
