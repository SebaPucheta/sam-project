"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WrongCredentialsError extends Error {
    constructor() {
        super('Invalid credentials');
    }
}
exports.default = WrongCredentialsError;
//# sourceMappingURL=wrong-credentials.js.map