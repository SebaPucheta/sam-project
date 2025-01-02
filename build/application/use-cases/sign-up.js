"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SignUpUseCase {
    constructor(userRepository, privateKey, saltRounds) {
        this.userRepository = userRepository;
        this.privateKey = privateKey;
        this.saltRounds = saltRounds;
    }
    async excecute(params) {
        const hash = bcryptjs_1.default.hashSync(params.password, bcryptjs_1.default.genSaltSync(this.saltRounds));
        const user = { email: params.email, hash };
        await this.userRepository.createUser(user);
        return { 'access-token': jsonwebtoken_1.default.sign(user, this.privateKey) };
    }
}
exports.default = SignUpUseCase;
//# sourceMappingURL=sign-up.js.map