"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const wrong_credentials_1 = __importDefault(require("../../errors/wrong-credentials"));
class LoginUseCase {
    constructor(userRepository, privateKey) {
        this.userRepository = userRepository;
        this.privateKey = privateKey;
    }
    async excecute(params) {
        const user = await this.userRepository.getUserByEmail(params.email);
        if (user && bcryptjs_1.default.compareSync(params.password, user.hash)) {
            return { 'access-token': jsonwebtoken_1.default.sign(user, this.privateKey) };
        }
        throw new wrong_credentials_1.default();
    }
}
exports.default = LoginUseCase;
//# sourceMappingURL=login.js.map