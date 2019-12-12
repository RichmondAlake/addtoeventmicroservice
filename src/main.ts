import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';
import {FormDefinitionModule} from './form-definition/form-definition.module';
import {Transport} from '@nestjs/microservices';

const logger = new Logger('Main');

async function bootstrap() {
    const app = await NestFactory.createMicroservice(FormDefinitionModule, {
        transport: Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 8877,
        },
    });
    // app.useGlobalPipes(new ValidationPipe({
    //     transform: true,
    // }));
    await app.listen(() => {
        logger.log('Form Definition Microservice listening');
    });
}

bootstrap();
