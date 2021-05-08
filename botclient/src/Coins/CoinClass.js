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

  // async fetchPriceNow() {
  //   try {
  //     const respond = await axios.get(
  //       //serverURL + "/coin/price?symbol=" + this.state.abbr.toUpperCase()
  //       serverURL +
  //         "/coin/price?symbol=" +
  //         this.abbr.toUpperCase() +
  //         "USDT" +
  //         "&exchange=" +
  //         this.exchange
  //     );
  //     this.calculatePercentage();
  //     this.priceNow = respond.data.price;
  //   } catch (err) {
  //     return 0;
  //   }
  // }

  // async fetchBasePrice() {
  //   try {
  //     const basePrice = await PriceService.getBasePrice(
  //       this.abbr.toUpperCase() + "USDT"
  //     );
  //     this.basePrice = basePrice;
  //   } catch (err) {
  //     return 0;
  //   }
  // }

  // async calculatePercentage() {
  //   if (this.basePrice !== null && this.priceNow !== null) {
  //     if (this.priceNow > this.basePrice) {
  //       this.side = "up";
  //       this.up = true;
  //     } else {
  //       this.up = false;
  //       this.side = "down";
  //     }
  //     setTimeout(() => {
  //       this.up = null;
  //     }, 500);
  //     this.percentage = Math.abs(
  //       (this.basePrice - this.priceNow) / this.priceNow
  //     );
  //   }
  // }

  getAbbreviationName() {
    const n = this.symbol.search("USDT");
    this.abbr = this.symbol.substring(0, n).toLowerCase();
    if (this.abbr.charAt(this.abbr.length - 1) === "_") {
      this.abbr = this.abbr.substring(0, this.abbr.length - 1);
    }
  }
}

export default Coin;
