import {ApiProperty} from "@nestjs/swagger";
import {QuotesDto} from "./quotes.dto";


export class CurrencyToPriceOutputDto{
    @ApiProperty()
    alias: string;
    @ApiProperty({
        isArray: true,
        type:QuotesDto
    })
    quotes: Array<QuotesDto>
}