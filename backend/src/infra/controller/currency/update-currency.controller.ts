import { Controller, Body, Param, Inject, Put } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { FactoryModule } from '../../../factory.module';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCurrecyUseCase } from '../../../usecases/update-currecy.usecase';

@Controller('v1/currency')
@ApiTags('currency')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Currency with invalid param' })
export class UpdateCurrencyController {
  constructor(
    @Inject(FactoryModule.UPDATE_CURRENCY_USE_CASE)
    private readonly updateCurrencyUseCase: UpdateCurrecyUseCase,
  ) {}

  @Put(':alias')
  async update(
    @Param('alias') alias: string,
    @Body() createCurrencyDto: CreateCurrencyDto,
  ) {
    return this.updateCurrencyUseCase.exec(alias, createCurrencyDto);
  }
}
