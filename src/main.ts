import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configuracionSwagger = new DocumentBuilder()
    .setTitle('API de Sanidad Vegetal')
    .setDescription('API de Breaze in the Moon para gestionar plantas, patogenos, enfermedades, tratamientos, cultivos y brotes')
    .setVersion('1.0')
    .build();
  const documento = SwaggerModule.createDocument(app, configuracionSwagger);
  SwaggerModule.setup('docs', app, documento);

  const configService = app.get(ConfigService);
  const puerto = Number(configService.get<string>('PORT')) || 3000;
  await app.listen(puerto);
}
await bootstrap();
