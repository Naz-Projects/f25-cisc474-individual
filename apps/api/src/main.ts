import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;

  // Configure CORS origins
  const origins = process.env.CLIENT_ORIGINS
    ? process.env.CLIENT_ORIGINS.split(',').map((origin) => origin.trim())
    : [
        'http://localhost:3001',
        'https://codify-lms.nazhossain16.workers.dev',
      ];

  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(port, host);
}

void bootstrap();
