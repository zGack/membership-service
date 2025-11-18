import { Membership } from '../..//entities/membership.entity';

export interface MembershipRepositoryPort {
    save(membership: Membership): void;
}
