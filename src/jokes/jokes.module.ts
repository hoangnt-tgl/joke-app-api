import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DatabaseModule } from '../database/database.module';
import { Joke } from './joke.entity';
import { JokesController } from './joke.controller';
import { JokesService } from './jokes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
