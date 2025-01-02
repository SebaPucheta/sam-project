import UserRepository from "../../ports/user-repository";
import LoginDto from "../../dtos/login.dto";
export default class LoginUseCase {
    private readonly userRepository;
    private readonly privateKey;
    constructor(userRepository: UserRepository, privateKey: string);
    excecute(params: LoginDto): Promise<{
        'access-token': string;
    }>;
}
