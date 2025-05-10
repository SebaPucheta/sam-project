"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const handler = async (event) => {
    try {
        const secrets = new secret_getter_1.default();
        const privateKey = await secrets.getSecretValue('AUTH_PRIVATE_KEY');
        const token = event.headers.Authorization || event.authorizationToken;
        const decodedToken = await jsonwebtoken_1.default.verify(token.replace('Bearer ', ''), privateKey);
        if (decodedToken) {
            return {
                principalId: 'user|a1b2c3d4',
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [{
                            Action: 'execute-api:Invoke',
                            Effect: 'Allow',
                            Resource: event.methodArn
                        }]
                },
                context: {
                    userId: 'user|a1b2c3d4'
                }
            };
        }
        else {
            throw new Error("Unauthorized");
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.handler = handler;
//# sourceMappingURL=authorizer.js.map