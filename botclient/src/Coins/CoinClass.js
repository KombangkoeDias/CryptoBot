import axios from "axios";
import serverURL from "../configs/serverURL";
import PriceService from "../Services/PriceService";

class Coin {
  constructor(symbol, exchange = "binance", amount = 0) {
    this.symbol = symbol;
    this.exchange = exchange;
    this.amount = amount;
    this.percentage = 0;
    this.basePrice = null;
    this.side = null;
    this.priceNow = null;
    this.abbr = "";
    this.up = null;
    this.getAbbreviationName();
    this.fetchBasePrice();
    this.fetchPriceNow();
  }

  async fetchPriceNow() {
    try {
      const respond = await axios.get(
        //serverURL + "/coin/price?symbol=" + this.state.abbr.toUpperCase()
        serverURL +
          "/coin/price?symbol=" +
          this.symbol +
          "&exchange=" +
          this.exchange
      );
      this.calculatePercentage();
      this.priceNow = respond.data.price;
    } catch (err) {
      return 0;
    }
  }

  async fetchBasePrice() {
    try {
      const basePrice = await PriceService.getBasePrice(this.symbol);
      this.basePrice = basePrice;
    } catch (err) {
      return 0;
    }
  }

  async calculatePercentage() {
    if (this.basePrice !== null && this.priceNow !== null) {
      if (this.priceNow > this.basePrice) {
        this.side = "up";
        this.up = true;
      } else {
        this.up = false;
        this.side = "down";
      }
      setTimeout(() => {
        this.up = null;
      }, 500);
      this.percentage = Math.abs(
        (this.basePrice - this.priceNow) / this.priceNow
      );
    }
  }

  getAbbreviationName() {
    const n = this.symbol.search("USDT");
    this.abbr = this.symbol.substring(0, n).toLowerCase();
    if (this.abbr.charAt(this.abbr.length - 1) === "_") {
      this.abbr = this.abbr.substring(0, this.abbr.length - 1);
    }
  }
}

export default Coin;
