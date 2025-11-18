import { Inject, Injectable, Logger } from '@nestjs/common';
import { ActivateMembershipPortIn } from '../ports/in/activate-membership.port';
import { MembershipRepository } from '../../adapters/out/membership.repository';
import { Membership } from '../entities/membership.entity';

@Injectable()
export class ActivateMembershipUseCase implements ActivateMembershipPortIn {
    constructor(
        @Inject('MembershipRepositoryPort')
        private readonly membershipRepository: MembershipRepository,
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
        this.membershipRepository.save(membership);

        return Promise.resolve();
    }
}
