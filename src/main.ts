import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Use Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        console.log(errors); // Log validation errors
        return new BadRequestException(errors);
      },
    }),
  );

    // // Set Global Prefix
    // const globalPrefix = 'api/v1';
    // app.setGlobalPrefix(globalPrefix);
  

  app.useStaticAssets(join(__dirname, '..', '..', 'public')); // Serve static files
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views')); // Set the views directory
  app.setViewEngine('ejs'); // Set the view engine to EJS

  console.log('Views Directory:', join(__dirname,'..', '..', 'public'));
  const port = process.env.PORT || 3000;

  // Start listening on the determined port
  await app.listen(port);

  // Log the actual port in use
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
}
bootstrap();
