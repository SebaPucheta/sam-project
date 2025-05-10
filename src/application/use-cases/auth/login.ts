import UserRepository from "../../ports/user-repository";
import LoginDto from "../../dtos/login.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import WrongCredentialsError from "../../errors/wrong-credentials";

export default class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly privateKey: string,
  ) {
  }

  async excecute(params: LoginDto): Promise<{'access-token': string}> {
    const user = await this.userRepository.getUserByEmail(params.email);

    if (user && bcrypt.compareSync(params.password, user.hash)) {
      return { 'access-token': jwt.sign(user, this.privateKey) };
    }

    throw new WrongCredentialsError();
  }
}
