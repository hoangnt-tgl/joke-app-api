import { Controller, Get, Post, Body } from '@nestjs/common';
import { Joke } from './joke.entity';
import { JokesService } from './jokes.service';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get()
  async getJoke(): Promise<Joke> {
    return this.jokesService.getJoke();
  }

  @Post('like')
  async like(@Body('joke') joke: Joke): Promise<void> {
    await this.jokesService.vote(joke, true);
  }

  @Post('dislike')
  async dislike(@Body('joke') joke: Joke): Promise<void> {
    await this.jokesService.vote(joke, false);
  }
}
