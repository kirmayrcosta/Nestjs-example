import {Prop} from "@nestjs/mongoose";

export class QuoteModel {

    @Prop()
    alias: string;
    @Prop()
    price: number;
}