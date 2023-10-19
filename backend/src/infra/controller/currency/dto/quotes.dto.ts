import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class QuotesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  alias: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  name: string;
}
