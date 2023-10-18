import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from '../infra/controller/currency/dto/create-currency.dto';
import { Currency } from '../domain/entities/currency.entity';
import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';
import { LoggerClientMock } from '../../test/unit/mock/loggerClientProtocols.mock';

@Injectable()
export class CreateCurrecyUseCase {
  constructor(
    private readonly currencyRepository: ICurrencyRepository,
    private readonly logger: LoggerClientMock,
  ) {}

  async exec(input: CreateCurrencyDto, ctx: any): Promise<Currency> {
    this.logger.setCtx(ctx);
    const currency = new Currency(input);
    const currencyExist = await this.currencyRepository.findByAlias(
      currency.alias,
    );
    if (currencyExist) {
      this.logger.error('Currency already exists', 'CreateCurrecyUseCase');
      throw new BadRequestException('Currency already exists');
    }
    const currencyCreate = await this.currencyRepository.create(currency);
    return currencyCreate;
  }
}
