import UserRepository from "../../ports/user-repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SignUpDto from "../../dtos/sign-up.dto";

export default class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly privateKey: string,
    private readonly saltRounds: number,
  ) {
  }

  async excecute(params: SignUpDto): Promise<{'access-token': string}> {
    const hash = bcrypt.hashSync(params.password, bcrypt.genSaltSync(this.saltRounds));
    const user = { email: params.email, hash };

    await this.userRepository.createUser(user);
    return { 'access-token': jwt.sign(user, this.privateKey) };
  }
}
