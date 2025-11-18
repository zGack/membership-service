import { Module } from '@nestjs/common';
import { MembershipModule } from './membership/membership.module';

@Module({
    imports: [MembershipModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
