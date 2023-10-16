import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {QuoteModel} from "./quote.schema";
import {Currency} from "../../domain/entities/currency.entity";
import {Quote} from "../../domain/entities/quote.entity";

export type CurrencyDocument = HydratedDocument<CurrencyModel>;

@Schema()
export class CurrencyModel {

    @Prop()
    idCurrency: string;

    @Prop()
    name: string;

    @Prop()
    alias: string

    @Prop()
    quotes: Array<QuoteModel>

}

export const CurrencySchema = SchemaFactory.createForClass(CurrencyModel);