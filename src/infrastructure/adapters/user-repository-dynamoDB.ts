import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import User from '../../domain/User';
import UserRepository from '../../application/ports/user-repository';

export default class UserRepositoryDynamoDB implements UserRepository {
  private tableName: string;
  private docClient: DynamoDBDocumentClient;

  constructor(tableName: string) {
    const client = new DynamoDBClient();
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  async getUserByEmail(email: string): Promise<User> {
    const params = {
      TableName : this.tableName,
      Key: { email },
    };

    const data = await this.docClient.send(new GetCommand(params));
    return data.Item as User;
  }

  async createUser(user: User): Promise<void> {
    const params = {
      TableName : this.tableName,
      Item: user,
    };
    const data = await this.docClient.send(new PutCommand(params));
  }
}
