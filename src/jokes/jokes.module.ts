import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joke } from './joke.entity';
import { JokesController } from './joke.controller';
import { JokesService } from './jokes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('jokes')
@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
