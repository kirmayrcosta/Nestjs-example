import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import {CreateCurrecyUseCase} from "../../../usecases/create-currecy.usecase";
import {GetAllCurrencyUseCase} from "../../../usecases/get-all-currency.usecase";
import {FactoryModule} from "../../../factory.module";
import {ConverterCurrencyToPriceUseCase} from "../../../usecases/converter-currency-to-price.usecase";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CurrencyToPriceOutputDto} from "./dto/currency-to-price.dto";



@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class GetAllCurrencyController {
  constructor(
    @Inject(FactoryModule.GET_ALL_CURRENCY_USE_CASE)
    private readonly getAllCurrencyUseCase: GetAllCurrencyUseCase
  ) {}

  @Get()
  findAll() {
    return this.getAllCurrencyUseCase.exec();
  }

}
