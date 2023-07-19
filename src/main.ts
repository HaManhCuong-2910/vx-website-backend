import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const port = process.env.PORT;
  app.use(bodyParser.urlencoded({ extended: false }));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log(`app listen http://localhost:${port}`);
  });
}
bootstrap();
