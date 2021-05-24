class Coin {
  constructor(
    symbol,
    exchange = "binance",
    //avg_buy = null,
    amount = 0,
    //logo = "",
    basePrice = 0,
    percentage = 0,
    percentage_range = [0, 0],
    price_range = [0, 0],
    side = null,
    priceNow = 0,
    avg_buy = 0
  ) {
    this.symbol = symbol;
    this.exchange = exchange;
    //this.logo = logo;
    //this.avg_buy = avg_buy;
    this.amount = amount;
    this.percentage = percentage;
    this.basePrice = basePrice;
    this.side = side;
    this.priceNow = priceNow;
    this.percentage_range = percentage_range;
    this.price_range = price_range;
    this.symbolWithNoUnderscore = this.getSymbolWithNoUnderscore();
    this.tradingPair = this.getTradingPair();
    this.avg_buy = avg_buy;
    this.abbr = "";
    this.getAbbreviationName();
  }

  getSymbolWithNoUnderscore() {
    let n = this.symbol.search("_");
    let thisSymbol = "";
    if (n !== -1) {
      thisSymbol = thisSymbol + this.symbol.substring(0, n);
      thisSymbol =
        thisSymbol + this.symbol.substring(n + 1, this.symbol.length);
    } else {
      thisSymbol = this.symbol;
    }
    return thisSymbol;
  }

  getAbbreviationName() {
    switch (this.tradingPair) {
      case "USDT":
        this.abbr = this.symbol
          .substring(0, this.symbol.length - 4)
          .toLowerCase();
        break;
      case "BUSD":
        this.abbr = this.symbol
          .substring(0, this.symbol.length - 4)
          .toLowerCase();
        break;
      case "ETH":
        this.abbr = this.symbol
          .substring(0, this.symbol.length - 3)
          .toLowerCase();
        break;
    }
    if (this.abbr.charAt(this.abbr.length - 1) === "_") {
      this.abbr = this.abbr.substring(0, this.abbr.length - 1);
    }
  }

  getTradingPair() {
    if (
      this.symbol.substring(this.symbol.length - 4, this.symbol.length) ===
      "USDT"
    ) {
      return "USDT";
    } else if (
      this.symbol.substring(this.symbol.length - 4, this.symbol.length) ===
      "BUSD"
    ) {
      return "BUSD";
    } else if (
      this.symbol.substring(this.symbol.length - 3, this.symbol.length) ===
      "ETH"
    ) {
      return "ETH";
    }
  }
}

export default Coin;
