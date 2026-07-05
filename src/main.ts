import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4001);
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: frontendUrl ?? true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Backend API for targeted portfolio pages and admin CMS.')
    .setVersion('0.1.0')
    .addTag('Health')
    .addTag('Contact')
    .addTag('Profile')
    .addTag('Projects')
    .addTag('Portfolios')
    .addTag('Skills')
    .addTag('Experiences')
    .addTag('Technologies')
    .addTag('Admin')
    .addTag('Admin Lookups')
    .addTag('Admin Content')
    .addTag('Admin Portfolios')
    .addTag('Admin Contact')
    .addTag('Media Files')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'API key',
        description: 'Use ADMIN_API_KEY as bearer token.',
      },
      'admin-api-key',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);
}
bootstrap();
