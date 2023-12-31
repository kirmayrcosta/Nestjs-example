import { Quote } from './quote.entity';
//format this code
export class Currency {
  name?: string;

  alias: string;

  quotes: Array<Quote>;

  constructor(props: {
    idCurrency?: string;
    name?: string;
    alias: string;
    quotes: Array<Quote>;
  }) {
    this.alias = props.alias;

    this.name = props.name || '';
    this.quotes = [];
    if (props.quotes && props.quotes.length) {
      props.quotes.forEach((quote) => {
        this.quotes.push(new Quote(quote));
      });
    }
  }

  toPrice(price: number): Currency {
    const currencyQuotes: Array<Quote> = [];
    if (this.quotes) {
      this.quotes.forEach((quote) => {
        quote.price = quote.price * price;
        currencyQuotes.push(new Quote(quote));
      });
    }

    return new Currency({
      alias: this.alias,
      name: this.name,
      quotes: currencyQuotes,
    });
  }
}
