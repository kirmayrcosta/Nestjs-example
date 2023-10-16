import {ApiProperty} from "@nestjs/swagger";

export class QuotesDto {
    @ApiProperty()
    alias: string;
    @ApiProperty()
    price: number;
}