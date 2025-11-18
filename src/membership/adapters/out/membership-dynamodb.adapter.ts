import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Logger } from '@nestjs/common';
import { Membership } from '../../domain/entities/membership.entity';
import { MembershipRepositoryPort } from '../../domain/ports/out/membership-repository-port';

export class MembershipDynamoDBAdapter implements MembershipRepositoryPort {
    private readonly ddbClient: DynamoDBClient = new DynamoDBClient({});
    private readonly tableName: string = process.env.MEMBERSHIP_TABLE || '';
    private readonly ddbDocClient: DynamoDBDocumentClient =
        DynamoDBDocumentClient.from(this.ddbClient, {
            marshallOptions: { removeUndefinedValues: true },
        });
    private readonly logger = new Logger(MembershipDynamoDBAdapter.name);

    async save(membership: Membership): Promise<void> {
        this.logger.debug(
            `Saving membership ${membership.id} into DynamoDB table: ${this.tableName}`,
        );
        this.logger.debug(JSON.stringify(membership));

        const dataToStore = {
            TableName: this.tableName,
            Item: membership,
        };

        try {
            await this.ddbDocClient.send(new PutCommand(dataToStore));
            this.logger.debug('Membership data successfully saved.');
        } catch (error) {
            this.logger.error('Membership data saving failde: ',error);
        }
    }
}
