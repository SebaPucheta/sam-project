import User from '../../domain/User';
import UserRepository from '../../application/ports/user-repository';
export default class UserRepositoryDynamoDB implements UserRepository {
    private tableName;
    private docClient;
    constructor(tableName: string);
    getUserByEmail(email: string): Promise<User>;
    createUser(user: User): Promise<void>;
}
