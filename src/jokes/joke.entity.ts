import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('jokes')
@Entity()
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  likes: number;

  @Column()
  dislikes: number;
}
