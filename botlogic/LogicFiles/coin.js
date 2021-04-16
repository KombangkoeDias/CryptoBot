const axios = require("axios");

class Coin {
  constructor(symbol, exchange = "binance") {
    this.symbol = symbol;
    this.exchange = exchange;
    this.amount = 0;
  }
  async getPrice() {
    if (this.exchange === "binance") {
      let respond = await axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=" + this.symbol
      );
      return parseFloat(respond.data.price);
    } else if (this.exchange === "gateio") {
      let respond = await axios.get(
        "https://api.gateio.ws/api/v4/spot/tickers/?currency_pair=" +
          this.symbol
      );
      return parseFloat(respond.data[0]["last"]);
    } else {
      return "no price data for this coin yet";
    }
  }

  async get24Ticker(symbol, exchange) {
    if (this.exchange === "binance") {
      let respond = await axios.get(
        "https://api.binance.com/api/v3/ticker/24hr?symbol=" + this.symbol
      );
      return respond.data;
    }
  }
}

module.exports = Coin;
