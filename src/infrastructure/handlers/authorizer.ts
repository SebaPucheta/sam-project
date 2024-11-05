import jwt from "jsonwebtoken";
import SecretGetter from "../../commons/secret-getter";

export const handler = async (event: any) => {
  try {
    const secrets = new SecretGetter();
    const privateKey = await secrets.getSecretValue('AUTH_PRIVATE_KEY');
    const token = event.headers.Authorization || event.authorizationToken;
    const decodedToken = await jwt.verify(token.replace('Bearer ', ''), privateKey);
    console.log(decodedToken);
    // Aquí deberías verificar el token (p. ej., JWT o algún token personalizado)
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
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    console.log(err);
  }
}
