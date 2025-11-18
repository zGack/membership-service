import { Inject, Logger } from '@nestjs/common';
import { DonationCreatedEvent } from '../../domain/events/donation-created.event';
import { EventSubscriberPort } from '../../domain/ports/in/event-subscriber.port';
import { ActivateMembershipPortIn } from '../../domain/ports/in/activate-membership.port';

export class MembershipEventBridgeAdapter
    implements EventSubscriberPort<DonationCreatedEvent>
{
    private readonly logger = new Logger(MembershipEventBridgeAdapter.name);

    constructor(
        @Inject('ActivateMembershipPortIn')
        private readonly activateMembershipPortIn: ActivateMembershipPortIn,
    ) {}

    async handle(event: DonationCreatedEvent) {
        this.logger.debug(`Received event: ${JSON.stringify(event)}`);

        await this.activateMembershipPortIn.activate(
            event.donationId,
            event.userId,
        );
    }
}
