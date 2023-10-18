import { Controller, Post, Body, Inject, Headers } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CreateCurrecyUseCase } from '../../../usecases/create-currecy.usecase';
import { FactoryModule } from '../../../factory.module';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggerClientProtocols } from '../../protocols/logger/logger-client.protocols';

@Controller('v1/currency')
@ApiTags('currency')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiCreatedResponse({ description: 'Currency create with success.' })
@ApiBadRequestResponse({ description: 'Currency with invalid fields.' })
export class CreateCurrencyController {
  constructor(
    @Inject(FactoryModule.CREATE_CURRENCY_USE_CASE)
    private readonly createCurrencyUseCase: CreateCurrecyUseCase,
    private readonly logger: LoggerClientProtocols,
  ) {}

  @Post()
  async create(
    @Headers('x-request-id') requestId: string,
    @Headers('x-correlation-id') correlationId: string,
    @Body() createCurrencyDto: CreateCurrencyDto,
  ) {
    const ctx = this.logger.setCtx({
      requestId,
      correlationId,
      path: '/',
      method: 'GET',
    });
    const currency = this.createCurrencyUseCase.exec(createCurrencyDto, ctx);
    return currency;
  }
}
