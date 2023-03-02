import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JokeDto } from './joke.dto';
import { Joke } from './joke.entity';

@Injectable()
export class JokesService {
  private jokes: Joke[] = [];
  private currentIndex = 0;

  constructor(
    @InjectRepository(Joke)
    private readonly jokeRepository: Repository<Joke>,
  ) {}

  async getJoke(): Promise<Joke> {
    if (this.jokes.length === 0) {
      this.jokes = await this.jokeRepository.find();
      this.currentIndex = 0;
    }
    const joke = this.jokes[this.currentIndex];
    this.currentIndex++;
    return joke;
  }

  async vote(jokeDto: JokeDto, isLiked: boolean): Promise<void> {
    const joke = await this.jokeRepository.findOne({
      where: { id: jokeDto.id },
    });
    if (!joke) {
      throw new HttpException('Joke not found', 404);
    }
    if (isLiked) {
      joke.likes++;
    } else {
      joke.dislikes++;
    }
    await this.jokeRepository.save(joke);
  }
}
