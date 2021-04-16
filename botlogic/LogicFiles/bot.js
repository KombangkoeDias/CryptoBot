const CoinList = require("./ListOfCoins");

class Bot {
  constructor() {
    this.coins = CoinList;
  }
  async getPortValues() {
    let value = await this.coins[0].getPrice();
    return value;
  }

  async getCoinPrice(symbol) {
    for (const coin of this.coins) {
      if (coin.symbol === symbol) {
        let value = await coin.getPrice();
        return value;
      }
    }
  }

  async getAllCoinPrices() {
    var prices = {};
    for (const coin of this.coins) {
      let value = await coin.getPrice();
      prices[coin.symbol] = value;
    }
    return prices;
  }
}

const CryptoBot = new Bot();

module.exports = CryptoBot;
