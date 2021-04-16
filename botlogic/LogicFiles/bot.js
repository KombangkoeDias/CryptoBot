const Coin = require("./coin");

class Bot {
  constructor() {
    this.coins = [];
    this.coins.push(new Coin("BNBUSDT"));
  }
  async getPortValues() {
    let value = await this.coins[0].getPrice();
    return value;
  }
}

const CryptoBot = new Bot();

module.exports = CryptoBot;
