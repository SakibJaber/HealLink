import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { resolve } from 'path';

export const typeormAsyncConfig = {
  useFactory: (configService: ConfigService): DataSourceOptions => {
    const host = configService.get<string>('DB_HOST');
    const port = configService.get<number>('DB_PORT');
    const username = configService.get<string>('DB_USERNAME');
    const password = configService.get<string>('DB_PASSWORD');
    const database = configService.get<string>('DB_NAME');

    console.log(
      `Connecting to PostgreSQL Database: ${database} at ${host}:${port} with user ${username}`,
    );

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      // entities: [resolve(__dirname, 'dist/domain/**/entity/*.js')],
      entities: [resolve(__dirname, '**/entity/*.js')],
      migrations: [resolve(__dirname, 'dist/migrations/*.js')],
      synchronize: true, // Keep it false if you are using migrations
      logging: false,
    };
  },
  inject: [ConfigService], // Only inject ConfigService
};
// console.log('Entities Path:', resolve(__dirname, '**/entity/*.js'));

// DataSource for migrations (Remove manual ConfigService injection here)
export const connectionSource = new DataSource(
  typeormAsyncConfig.useFactory(new ConfigService()) as DataSourceOptions,
);
