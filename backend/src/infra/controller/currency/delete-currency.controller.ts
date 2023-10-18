import { Controller, Param, Delete, Inject, HttpCode } from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteCurrencyUseCase } from '../../../usecases/delete-currency.usecase';

@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
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
