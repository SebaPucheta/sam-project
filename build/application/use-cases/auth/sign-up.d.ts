import UserRepository from "../../ports/user-repository";
import SignUpDto from "../../dtos/sign-up.dto";
export default class SignUpUseCase {
    private readonly userRepository;
    private readonly privateKey;
    private readonly saltRounds;
    constructor(userRepository: UserRepository, privateKey: string, saltRounds: number);
    excecute(params: SignUpDto): Promise<{
        'access-token': string;
    }>;
}
