import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencySchema } from '../schema/currency.schema';
import { CurrencyRepository } from './currency.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }]),
  ],
  providers: [CurrencyRepository],
  exports: [CurrencyRepository],
})
export class RepositoriesModule {}
