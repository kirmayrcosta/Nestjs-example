import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import {CreateCurrecyUseCase} from "../../../usecases/create-currecy.usecase";
import {FactoryModule} from "../../../factory.module";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";



@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class CreateCurrencyController {
  constructor(
    @Inject(FactoryModule.CREATE_CURRENCY_USE_CASE)
    private readonly createCurrencyUseCase: CreateCurrecyUseCase,
  ) {}

  @Post()
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    const currency =  await this.createCurrencyUseCase.exec(createCurrencyDto);
    return CreateCurrencyDto.output(currency);
  }
}
