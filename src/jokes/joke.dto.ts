import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('jokes')
export class JokeDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
