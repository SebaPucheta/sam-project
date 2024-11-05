import LoginDto from "../../application/dtos/login-dto";
import WrongCredentialsError from "../../application/errors/wrong-credentials";
import LoginUseCase from "../../application/use-cases/login";
import SecretGetter from "../../commons/secret-getter";
import UserRepositoryDynamoDB from "../adapters/user-repository-dynamoDB";

class LoginHandler {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async handle(params: LoginDto) {
    try {
      const access = await this.loginUseCase.excecute(params);
      const response = {
        statusCode: 200,
        body: JSON.stringify(access),
      }
  
      return response;
    } catch (error) {
      console.error(error)
      let response = {
        statusCode: 500,
        body: JSON.stringify({message: 'Internal Server Error'}),
      }

      if (error instanceof WrongCredentialsError) {
        response = {
          statusCode: 403,
          body: JSON.stringify({message: error.message}),
        }
      }

      return response;
    }
  }
}

export const loginHandler = async (event: { body: string; }) => {
    const secrets = new SecretGetter();
    const usersTableName = await secrets.getSecretValue('USERS_TABLE_NAME');
    const privateKey = await secrets.getSecretValue('AUTH_PRIVATE_KEY');
    const repository = new UserRepositoryDynamoDB(usersTableName || '');
  
    const useCase = new LoginUseCase(repository, privateKey || '');
    const handler = new LoginHandler(useCase);
  
    return await handler.handle(JSON.parse(event.body) as unknown as LoginDto);
}