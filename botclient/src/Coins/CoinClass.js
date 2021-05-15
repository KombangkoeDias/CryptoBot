import axios from "axios";
import serverURL from "../configs/serverURL";
import PriceService from "../Services/PriceService";

class Coin {
  constructor(
    symbol,
    exchange = "binance",
    //avg_buy = null,
    amount = 0,
    basePrice = 0,
    percentage = 0,
    percentage_range = [0, 0],
    price_range = [0, 0],
    side = null,
    priceNow = 0
  ) {
    this.symbol = symbol;
    this.exchange = exchange;
    //this.avg_buy = avg_buy;
    this.amount = amount;
    this.percentage = percentage;
    this.basePrice = basePrice;
    this.side = side;
    this.priceNow = priceNow;
    this.percentage_range = percentage_range;
    this.price_range = price_range;
    this.tradingPair = this.getTradingPair();
    this.abbr = "";
    this.getAbbreviationName();
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
