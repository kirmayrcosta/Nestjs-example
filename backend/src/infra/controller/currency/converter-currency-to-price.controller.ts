import { Controller, Get, Param, Inject } from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import { ConverterCurrencyToPriceUseCase } from '../../../usecases/converter-currency-to-price.usecase';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyToPriceOutputDto } from './dto/currency-to-price.dto';

@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class ConverterCurrencyToPriceController {
  constructor(
    @Inject(FactoryModule.CONVERTER_CURRENCY_TO_PRICE_USE_CASE)
    private readonly converterCurrencyToPriceUseCase: ConverterCurrencyToPriceUseCase,
  ) {}

  @ApiOkResponse({
    type: CurrencyToPriceOutputDto,
  })
  @Get('/converter/:alias/:price')
  converterCurrencyToPrice(
    @Param('alias') alias: string,
    @Param('price') price: number,
  ) {
    return this.converterCurrencyToPriceUseCase.exec(alias, price);
  }
}
