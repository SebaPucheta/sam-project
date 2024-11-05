import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

export default class SecretGetter {
  private client;

  constructor() {
    if (process.env.NODE_ENV !== 'local') {
      this.client = new SecretsManagerClient();
    }
  }

  async getSecretValue(secretKey: string) {
    if (this.client) {
      const secrets = await this.client.send(
        new GetSecretValueCommand({
          SecretId: process.env.SECRET_NAME,
        }),
      );
  
      if (!secrets.SecretString) {
        return null
      }
      return JSON.parse(secrets.SecretString)[secretKey];
    }

    return process.env[secretKey];
  }
}
