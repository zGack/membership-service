import { Inject, Injectable, Logger } from '@nestjs/common';
import { ActivateMembershipPortIn } from '../ports/in/activate-membership.port';
import { Membership } from '../entities/membership.entity';
import { MembershipDynamoDBAdapter } from '../../adapters/out/membership-dynamodb.adapter';

@Injectable()
export class ActivateMembershipUseCase implements ActivateMembershipPortIn {
    constructor(
        @Inject('MembershipRepositoryPort')
        private readonly membershipRepository: MembershipDynamoDBAdapter,
    ) {}

    private readonly logger = new Logger(ActivateMembershipUseCase.name);

    async activate(donationId: string, userId: string): Promise<void> {
        this.logger.debug(
            `Activating membership for user ${userId} from donation ${donationId}`,
        );

        const membership = new Membership(
            Date.now().toString(),
            userId,
            donationId,
        );
        await this.membershipRepository.save(membership);

        return Promise.resolve();
    }
}
