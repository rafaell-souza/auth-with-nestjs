import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from './filters/global-filter';
import { HttpAdapterHost } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true

    }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
