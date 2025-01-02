"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class UserRepositoryDynamoDB {
    constructor(tableName) {
        const client = new client_dynamodb_1.DynamoDBClient();
        this.docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
        this.tableName = tableName;
    }
    async getUserByEmail(email) {
        const params = {
            TableName: this.tableName,
            Key: { email },
        };
        const data = await this.docClient.send(new lib_dynamodb_1.GetCommand(params));
        return data.Item;
    }
    async createUser(user) {
        const params = {
            TableName: this.tableName,
            Item: user,
        };
        await this.docClient.send(new lib_dynamodb_1.PutCommand(params));
    }
}
exports.default = UserRepositoryDynamoDB;
//# sourceMappingURL=user-repository-dynamoDB.js.map