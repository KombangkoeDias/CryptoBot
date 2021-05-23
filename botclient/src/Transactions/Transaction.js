class Transaction {
  constructor(symbol, logo, exchange, price, side, amount, time) {
    this.symbol = symbol;
    this.logo = logo;
    this.exchange = exchange;
    this.price = price;
    this.side = side;
    this.amount = amount;
    this.time = time;
  }
}

export default Transaction;
