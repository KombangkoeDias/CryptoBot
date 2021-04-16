const axios = require("axios");

class Coin {
  constructor(symbol, exchange = "binance") {
    this.symbol = symbol;
    this.exchange = exchange;
    this.amount = 0;
  }
  async getPrice() {
    // let config = {
    //   headers: {
    //     "X-CMC_PRO_API_KEY": "fa5c13cc-6dd8-465e-8437-6ed4eede6e51",
    //   },
    // };
    // let respond = await axios.get(
    //   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=" +
    //     this.symbol,
    //   config
    // );
    // let value = respond.data.data[this.symbol]["quote"]["USD"]["price"];
    // return value;
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
    } else if (this.exchange === "bitmart") {
      let respond = await axios.get(
        "https://api-cloud.bitmart.com/spot/v1/ticker?symbol=" + this.symbol
      );
      return parseFloat(respond.data.data["tickers"][0]["last_price"]);
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
