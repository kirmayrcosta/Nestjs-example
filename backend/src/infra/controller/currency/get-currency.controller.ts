import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import {FactoryModule} from "../../../factory.module";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetCurrencyUseCase} from "../../../usecases/get-currency.usecase";



@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class GetCurrencyController {
  constructor(
    @Inject(FactoryModule.GET_CURRENCY_USE_CASE)
    private readonly getCurrencyUseCase: GetCurrencyUseCase
  ) {}

  @Get(":alias")
  findById(@Param('alias') alias: string) {
    return this.getCurrencyUseCase.exec(alias);
  }

}
