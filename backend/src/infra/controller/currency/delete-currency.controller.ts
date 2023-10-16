import {Controller, Param, Delete, Inject, Body} from '@nestjs/common';
import {FactoryModule} from "../../../factory.module";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DeleteCurrencyUseCase} from "../../../usecases/delete-currency.usecase";
import {QuotesDto} from "./dto/quotes.dto";


@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class DeleteCurrencyController {
  constructor(
    @Inject(FactoryModule.DELETE_CURRENCY_USE_CASE)
    private readonly deleteCurrencyUseCase: DeleteCurrencyUseCase
  ) {}

  @Delete(":alias")
  remove(@Param('alias') alias: string) {
    return this.deleteCurrencyUseCase.exec(alias);
  }

}
