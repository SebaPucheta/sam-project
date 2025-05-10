"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
class SecretGetter {
    constructor() {
        if (process.env.NODE_ENV !== 'local') {
            this.client = new client_secrets_manager_1.SecretsManagerClient();
        }
    }
    async getSecretValue(secretKey) {
        if (this.client) {
            const secrets = await this.client.send(new client_secrets_manager_1.GetSecretValueCommand({
                SecretId: process.env.SECRET_NAME,
            }));
            if (!secrets.SecretString) {
                return null;
            }
            return JSON.parse(secrets.SecretString)[secretKey];
        }
        return process.env[secretKey];
    }
}
exports.default = SecretGetter;
//# sourceMappingURL=secret-getter.js.map