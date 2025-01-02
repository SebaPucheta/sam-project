import User from "../../domain/User";
export default interface UserRepository {
    getUserByEmail(email: string): Promise<User>;
    createUser(user: User): Promise<void>;
}
