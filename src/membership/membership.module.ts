import { Module } from '@nestjs/common';
import { ActivateMembershipUseCase } from './domain/usecases/activate-membership.usecase';
import { MembershipRepository } from './adapters/out/membership.repository';
import { ActivateMembershipPortIn } from './domain/ports/in/activate-membership.port';
import { MembershipEventBridgeAdapter } from './adapters/in/membership-eventbridge.adapter';
import { MembershipEventService } from './entrypoints/event/membership-event.service';
import { MembershipDynamoDBAdapter } from './adapters/out/membership-dynamodb.adapter';

@Module({
    providers: [
        {
            provide: 'MembershipRepositoryPort',
            useClass: MembershipDynamoDBAdapter,
        },
        {
            provide: 'ActivateMembershipPortIn',
            useClass: ActivateMembershipUseCase,
        },
        {
            provide: 'EventSubscriberPort',
            useClass: MembershipEventBridgeAdapter,
        },
        {
            provide: MembershipEventBridgeAdapter,
            useFactory: (
                activateMembershipPortIn: ActivateMembershipPortIn,
            ) => {
                return new MembershipEventBridgeAdapter(
                    activateMembershipPortIn,
                );
            },
            inject: ['ActivateMembershipPortIn'],
        },
        MembershipEventService,
    ],
})
export class MembershipModule {}
