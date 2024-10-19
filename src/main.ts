import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix("/api/v2")


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      transform: true,
      transformOptions: { enableImplicitConversion: true }//sirve para transformar a entero los paramstros de la url en la peticion

    })
  )


  await app.listen(process.env.PORT);
  log("App runnin in port ... ", process.env.PORT)
}
bootstrap();
