import {Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import {CreateCurrecyUseCase} from "../../../usecases/create-currecy.usecase";
import {FactoryModule} from "../../../factory.module";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UpdateCurrecyUseCase} from "../../../usecases/update-currecy.usecase";
import {UpdateQuoteToCurrencyUsecase} from "../../../usecases/update-quote-to-currency.usecase";
import {QuotesDto} from "./dto/quotes.dto";



@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class UpdateQuoteToCurrencyController {
  constructor(
    @Inject(FactoryModule.UPDATE_QUOTATION_TO_CURRENCY_USE_CASE)
    private readonly updateQuoteToCurrencyUsecase: UpdateQuoteToCurrencyUsecase,
  ) {}

  @Put("/:alias/quotes/:quoteAlias")
  async update(@Param('alias') alias: string,
                @Param('quoteAlias') quoteAlias: string,
               @Body() quote: QuotesDto) {
    const currency =  await this.updateQuoteToCurrencyUsecase.exec(alias,quoteAlias, quote);
    return CreateCurrencyDto.output(currency);
  }
}
