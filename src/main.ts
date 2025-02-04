import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as methodOverride from 'method-override';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(methodOverride('_method'));
  // Use Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove fields not in DTO
      // forbidNonWhitelisted: false, // Prevent extra fields
      // transform: false, // Auto-transform to DTO classes
      exceptionFactory: (errors) => {
        console.log(errors); // Log validation errors
        return new BadRequestException(errors);
      },
    }),
  );

  // // Set Global Prefix
  // const globalPrefix = 'api/v1';
  // app.setGlobalPrefix(globalPrefix);

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));  // Serve 'uploads' folder
  app.useStaticAssets(join(process.cwd(), 'public')); // Serve static files
  app.setBaseViewsDir(join(process.cwd(), 'views')); // Set the views directory
  app.setViewEngine('ejs'); // Set the view engine to EJS

  const port = process.env.PORT || 3000;

  // Start listening on the determined port
  await app.listen(port);

  // Log the actual port in use
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
}
bootstrap();
