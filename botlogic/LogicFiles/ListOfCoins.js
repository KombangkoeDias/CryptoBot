const Coin = require("./coin");

const symbolList = {
  ADAUSDT: "binance",
  ATOMUSDT: "binance",
  BANDUSDT: "binance",
  BNBUSDT: "binance",
  BTCUSDT: "binance",
  CAKEUSDT: "binance",
  DENTUSDT: "binance",
  DOTUSDT: "binance",
  ENJUSDT: "binance",
  ETHUSDT: "binance",
  FILUSDT: "binance",
  GTUSDT: "gateio",
  HOTUSDT: "binance",
  KSMUSDT: "binance",
  KYLUSDT: "gateio",
  LINKUSDT: "binance",
  LITUSDT: "binance",
  ONEUSDT: "binance",
  PBRUSDT: "gateio",
  PCXUSDT: "gateio",
  PKFUSDT: "gateio",
  POLKUSDT: "gateio",
  POLSUSDT: "gateio",
  SOLUSDT: "binance",
  STORJUSDT: "binance",
  STPTUSDT: "binance",
  SXPUSDT: "binance",
  THETAUSDT: "binance",
  WANUSDT: "binance",
  XTZUSDT: "binance",
  ZILUSDT: "binance",
  SAFEMOONUSDT: "bitmart",
};

const CoinList = [];
for (const symbol in symbolList) {
  CoinList.push(new Coin(symbol, symbolList[symbol]));
}

module.exports = CoinList;
