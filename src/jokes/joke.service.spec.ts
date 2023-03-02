import { Test, TestingModule } from '@nestjs/testing';
import { JokesService } from './jokes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Joke } from './joke.entity';

describe('JokesService', () => {
  let service: JokesService;
  let jokeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JokesService,
        {
          provide: getRepositoryToken(Joke),
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: 1,
                text: 'Why did the tomato turn red?',
                likes: 0,
                dislikes: 0,
              },
              {
                id: 2,
                text: 'What did the left eye say to the right eye?',
                likes: 0,
                dislikes: 0,
              },
            ]),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JokesService>(JokesService);
    jokeRepository = module.get(getRepositoryToken(Joke));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getJoke', () => {
    it('should return the next joke in the list', async () => {
      const joke = await service.getJoke();
      expect(joke.id).toEqual(1);
      expect(joke.text).toEqual('Why did the tomato turn red?');
    });

    it('should return the second joke after the first joke is voted on', async () => {
      const joke1 = await service.getJoke();
      await service.vote(joke1, true);
      const joke2 = await service.getJoke();
      expect(joke2.id).toEqual(2);
      expect(joke2.text).toEqual('What did the left eye say to the right eye?');
    });
  });

  describe('vote', () => {
    it('should increment the likes count for a joke', async () => {
      const joke = {
        id: 1,
        text: 'Why did the tomato turn red?',
        likes: 0,
        dislikes: 0,
      };
      await service.vote(joke, true);
      expect(joke.likes).toEqual(1);
      expect(joke.dislikes).toEqual(0);
      expect(jokeRepository.save).toHaveBeenCalledWith(joke);
    });

    it('should increment the dislikes count for a joke', async () => {
      const joke = {
        id: 1,
        text: 'Why did the tomato turn red?',
        likes: 0,
        dislikes: 0,
      };
      await service.vote(joke, false);
      expect(joke.likes).toEqual(0);
      expect(joke.dislikes).toEqual(1);
      expect(jokeRepository.save).toHaveBeenCalledWith(joke);
    });
  });
});
