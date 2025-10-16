import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { from } from 'rxjs';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS to allow multiple origins (dev and production)
  const allowedOrigins = [
    'http://localhost:3001',
    process.env.FRONTEND_URL, // Cloudflare Pages production
    /\.codify-lms\.pages\.dev$/, // Cloudflare Pages preview branches
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins array or matches regex
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === 'string') {
          return origin === allowedOrigin;
        }
        return allowedOrigin.test(origin);
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  await app.listen(port, host);
}

void bootstrap();
