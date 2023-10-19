import { ApiProperty } from '@nestjs/swagger';
import { QuotesDto } from './quotes.dto';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  alias: string;

  @ApiProperty({
    isArray: true,
    type: QuotesDto,
  })
  @ValidateNested()
  @IsArray()
  @IsOptional()
  quotes: Array<QuotesDto>;
}
