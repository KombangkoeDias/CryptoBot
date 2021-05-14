import axios from "axios";
import serverURL from "../configs/serverURL";
import PriceService from "../Services/PriceService";

class Coin {
  constructor(
    symbol,
    exchange = "binance",
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
    this.amount = amount;
    this.percentage = percentage;
    this.basePrice = basePrice;
    this.side = side;
    this.priceNow = priceNow;
    this.percentage_range = percentage_range;
    this.price_range = price_range;
    this.abbr = "";
    this.getAbbreviationName();
  }

  getAbbreviationName() {
    let n = this.symbol.search("USDT");
    if (n === -1) {
      n = this.symbol.search("ETH");
    }
    this.abbr = this.symbol.substring(0, n).toLowerCase();
    if (this.abbr.charAt(this.abbr.length - 1) === "_") {
      this.abbr = this.abbr.substring(0, this.abbr.length - 1);
    }
  }
}

export default Coin;
