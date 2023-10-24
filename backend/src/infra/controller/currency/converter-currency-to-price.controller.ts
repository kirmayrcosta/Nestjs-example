import {
  Controller,
  Get,
  Param,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import { ConverterCurrencyToPriceUseCase } from '../../../usecases/converter-currency-to-price.usecase';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrencyToPriceOutputDto } from './dto/currency-to-price.dto';
import { CacheInterceptor } from '../../interceptor/cache.interceptor';

@Controller('v1/currency')
@ApiTags('currency')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiOkResponse({ description: 'Currency was converted to quote' })
export class ConverterCurrencyToPriceController {
  constructor(
    @Inject(FactoryModule.CONVERTER_CURRENCY_TO_PRICE_USE_CASE)
    private readonly converterCurrencyToPriceUseCase: ConverterCurrencyToPriceUseCase,
  ) {}

  @ApiOkResponse({
    type: CurrencyToPriceOutputDto,
  })
  @UseInterceptors(CacheInterceptor)
  @Get('/converter/:alias/:price')
  calc(@Param('alias') alias: string, @Param('price') price: number) {
    return this.converterCurrencyToPriceUseCase.exec(alias, price);
  }
}
