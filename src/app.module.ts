import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JokesModule } from './jokes/jokes.module';
import { DatabaseModule } from './database/database.module';
import { SwaggerModule } from '@nestjs/swagger';
@Module({
  imports: [ConfigModule, JokesModule, DatabaseModule, SwaggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
