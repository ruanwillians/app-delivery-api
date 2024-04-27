import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './db/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbdatasource } from './db/data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongoModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbdatasource),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
