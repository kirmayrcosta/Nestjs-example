import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import {FactoryModule} from "../../../factory.module";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AddQuoteToCurrencyUseCase} from "../../../usecases/create-quote-to-currecy.usecase";
import {QuotesDto} from "./dto/quotes.dto";



@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class AddQuoteToCurrencyController {
  constructor(
    @Inject(FactoryModule.ADD_QUOTATION_TO_CURRENCY_USE_CASE)
    private readonly addQuoteToCurrencyUseCase: AddQuoteToCurrencyUseCase,
  ) {}

  @Post('/:alias/quotes')
  async create(
      @Param('alias') alias: string,
      @Body() quoteDto: QuotesDto) {
    const currency =  await this.addQuoteToCurrencyUseCase.exec(alias, quoteDto);
    return CreateCurrencyDto.output(currency);
  }
}
