import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-exception.filter';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(envs.port);

  logger.log(`Gateway running on pot ${envs.port}`);
}
bootstrap();
