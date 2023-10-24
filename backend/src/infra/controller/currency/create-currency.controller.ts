import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CreateCurrecyUseCase } from '../../../usecases/create-currecy.usecase';
import { FactoryModule } from '../../../factory.module';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('v1/currency')
@ApiTags('currency')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiCreatedResponse({ description: 'Currency create with success.' })
@ApiBadRequestResponse({ description: 'Currency with invalid fields.' })
export class CreateCurrencyController {
  constructor(
    @Inject(FactoryModule.CREATE_CURRENCY_USE_CASE)
    private readonly createCurrencyUseCase: CreateCurrecyUseCase,
  ) {}

  @Post()
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.createCurrencyUseCase.exec(createCurrencyDto);
  }
}
