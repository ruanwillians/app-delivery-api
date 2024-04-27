import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          migrations: ['src/migration/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migration',
          },
          migrationsRun: true,
          entities: [],
          synchronize: true,
        }) as ConnectionOptions,
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresModule {}
