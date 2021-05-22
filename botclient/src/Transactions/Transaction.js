class Transaction {
  constructor(symbol, exchange, price, side, amount, time) {
    this.symbol = symbol;
    this.exchange = exchange;
    this.price = price;
    this.side = side;
    this.amount = amount;
    this.time = time;
  }
}

export default Transaction;
