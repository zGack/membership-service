import { Inject, Injectable } from '@nestjs/common';
import { EventSubscriberPort } from '../../domain/ports/in/event-subscriber.port';
import { DonationCreatedEvent } from '../../domain/events/donation-created.event';

@Injectable()
export class MembershipEventService {
    constructor(
        @Inject('EventSubscriberPort')
        private readonly eventSubscriberPort: EventSubscriberPort<DonationCreatedEvent>,
    ) {}

    async process(message: any) {
        const donationCreatedEvent = message.detail;

        return this.eventSubscriberPort.handle(donationCreatedEvent);
    }
}
