import SignUpDto from "../../application/dtos/sign-up-dto";
import SignUpUseCase from "../../application/use-cases/sign-up";
import SecretGetter from "../../commons/secret-getter";
import UserRepositoryDynamoDB from "../adapters/user-repository-dynamoDB";

class SignUpHandler {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle(params: SignUpDto) {
    const access = await this.signUpUseCase.excecute(params);
    const response = {
      statusCode: 200,
      body: JSON.stringify(access),
    }

    return response;
  }
}

export const signUpHandler = async (event: { body: string; }) => {
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

  return await handler.handle(JSON.parse(event.body) as unknown as SignUpDto);
}