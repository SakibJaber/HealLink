import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormAsyncConfig } from 'ormconfig';
import { DomainModule } from './domain/domain.module';
import * as session from 'express-session';



const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.dev'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`.trim(),
      // load: [appConfig],
    }),
    TypeOrmModule.forRootAsync(typeormAsyncConfig), // Async TypeORM config
    DomainModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.SESSION_SECRET || 'mysecret', // Use an environment variable for the secret
          resave: false,
          saveUninitialized: false,
          cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
          },
        }),
      )
      .exclude('auth/login', 'auth/signup', 'auth/logout') // Exclude login, signup, and logout routes
      .forRoutes('*');
  }
}

