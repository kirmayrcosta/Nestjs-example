import { Currency } from '../../../../domain/entities/currency.entity';
import { ApiProperty } from '@nestjs/swagger';
import { QuotesDto } from './quotes.dto';

export class CreateCurrencyDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  alias: string;
  @ApiProperty({
    isArray: true,
    type: QuotesDto,
  })
  quotes: Array<QuotesDto>;
  static output(currency: Currency) {
    return {
      alias: currency.alias,
      quotes: currency.quotes,
    };
  }
}
