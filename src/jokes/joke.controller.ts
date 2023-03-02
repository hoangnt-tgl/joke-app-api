import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { Joke } from './joke.entity';
import { JokesService } from './jokes.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { JokeDto } from './joke.dto';
import { validate } from 'class-validator';
@ApiTags('jokes')
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get()
  async getJoke(): Promise<Joke> {
    return this.jokesService.getJoke();
  }

  @Post('like')
  @ApiBody({ type: JokeDto })
  async like(@Body() jokeDto: JokeDto): Promise<void> {
    const errors = await validate(jokeDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    await this.jokesService.vote(jokeDto, true);
  }

  @Post('dislike')
  @ApiBody({ type: JokeDto })
  async dislike(@Body() jokeDto: JokeDto): Promise<void> {
    console.log('dislike', jokeDto);
    await this.jokesService.vote(jokeDto, false);
  }
}
