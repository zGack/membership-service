import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { MembershipEventService } from './membership/entrypoints/event/membership-event.service';

let cachedServer: MembershipEventService;

async function bootstrap() {
    if (!cachedServer) {
        // const app = await NestFactory.create(AppModule);
        // app.enableCors();
        // await app.init();
        //
        // const expressApp = app.getHttpAdapter().getInstance();
        // cachedServer = serverlessExpress({ app: expressApp });
        const appContext = await NestFactory.createApplicationContext(AppModule);
        const eventsService = appContext.get(MembershipEventService);
        cachedServer = eventsService;
    }
    return cachedServer;
}

export const handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    cachedServer = await bootstrap();

    return cachedServer.process(event);
};
