export class Quote {
  alias: string;
  price: number;

  constructor(props: { alias: string; price?: number }) {
    this.alias = props.alias;
    this.price = props?.price;
  }
}
