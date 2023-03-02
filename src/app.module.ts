import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JokesModule } from './jokes/jokes.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [ConfigModule, JokesModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
