import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async vote(joke: Joke, isLiked: boolean): Promise<void> {
    if (isLiked) {
      joke.likes++;
    } else {
      joke.dislikes++;
    }
    await this.jokeRepository.save(joke);
  }
}
