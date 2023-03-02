import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // SwaggerModule options
  const config = new DocumentBuilder()
    .setTitle('Jokes API')
    .setDescription('The Jokes API description')
    .setVersion('1.0')
    .addTag('jokes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
