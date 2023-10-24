import { Controller, Param, Delete, Inject, HttpCode } from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteCurrencyUseCase } from '../../../usecases/delete-currency.usecase';

@Controller('v1/currency')
@ApiTags('currency')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Currency with invalid fields.' })
@ApiNoContentResponse({ description: 'Currency was deleted' })
export class DeleteCurrencyController {
  constructor(
    @Inject(FactoryModule.DELETE_CURRENCY_USE_CASE)
    private readonly deleteCurrencyUseCase: DeleteCurrencyUseCase,
  ) {}

  @Delete(':alias')
  @HttpCode(204)
  remove(@Param('alias') alias: string) {
    return this.deleteCurrencyUseCase.exec(alias);
  }
}
