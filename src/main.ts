import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'keyword',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  const config = new DocumentBuilder()
      .setTitle('Магазин')
      .setDescription('api documentation')
      .setVersion('0.1')
      .addTag('api')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(3000);
  Logger.log('Server start in port 3000');
}
bootstrap();
