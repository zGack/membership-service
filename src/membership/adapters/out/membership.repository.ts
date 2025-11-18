import { Logger } from '@nestjs/common';
import { MembershipRepositoryPort } from '../../domain/ports/out/membership-repository-port';
import { Membership } from '../../domain/entities/membership.entity';

export class MembershipRepository implements MembershipRepositoryPort {
    private readonly logger = new Logger(MembershipRepository.name);

    save(membership: Membership): void {
        this.logger.debug(`Saving membership ${membership.id}`);
    }
}
