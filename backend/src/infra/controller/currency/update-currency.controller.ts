import {Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import {CreateCurrecyUseCase} from "../../../usecases/create-currecy.usecase";
import {FactoryModule} from "../../../factory.module";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UpdateCurrecyUseCase} from "../../../usecases/update-currecy.usecase";



@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class UpdateCurrencyController {
  constructor(
    @Inject(FactoryModule.UPDATE_CURRENCY_USE_CASE)
    private readonly updateCurrencyUseCase: UpdateCurrecyUseCase,
  ) {}

  @Put(":alias")
  async create(@Param('alias') alias: string,
               @Body() createCurrencyDto: CreateCurrencyDto) {
    const currency =  await this.updateCurrencyUseCase.exec(alias, createCurrencyDto);
    return CreateCurrencyDto.output(currency);
  }
}
