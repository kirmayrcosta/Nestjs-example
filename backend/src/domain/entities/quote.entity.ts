export class Quote {
  alias: string;
  price: number;
  name?: string;

  constructor(props: { alias: string; price?: number; name?: string }) {
    this.alias = props.alias;
    this.name = props?.name;
    this.price = props?.price;
  }
}
