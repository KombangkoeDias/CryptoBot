import Coin from "./CoinClass";

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
  GT_USDT: "gateio",
  HOTUSDT: "binance",
  INJUSDT: "binance",
  KSMUSDT: "binance",
  KYL_USDT: "gateio",
  LINKUSDT: "binance",
  LITUSDT: "binance",
  ONEUSDT: "binance",
  PBR_USDT: "gateio",
  PCX_USDT: "gateio",
  PKF_USDT: "gateio",
  POLK_USDT: "gateio",
  POLS_USDT: "gateio",
  SOLUSDT: "binance",
  STPTUSDT: "binance",
  SXPUSDT: "binance",
  ZILUSDT: "binance",
  SAFEMOON_USDT: "bitmart",
};

const amount = {
  ADAUSDT: 702.986,
  ATOMUSDT: 4.6377,
  BANDUSDT: 1.47852,
  BNBUSDT: 0.488535,
  BTCUSDT: 0,
  CAKEUSDT: 13.4567,
  DENTUSDT: 7583.35,
  DOTUSDT: 32.3447,
  ENJUSDT: 10.4895,
  ETHUSDT: 0.042082,
  FILUSDT: 0,
  GT_USDT: 5.4619,
  HOTUSDT: 4092,
  INJUSDT: 0.76,
  KSMUSDT: 0.652528,
  KYL_USDT: 34.1944,
  LINKUSDT: 1.25373,
  LITUSDT: 3.157,
  ONEUSDT: 346.911,
  PBR_USDT: 131.898,
  PCX_USDT: 4.6117,
  PKF_USDT: 32.934,
  POLK_USDT: 29.94,
  POLS_USDT: 16.467,
  SOLUSDT: 6.993,
  STORJUSDT: 0,
  STPTUSDT: 273.127,
  SXPUSDT: 8.90309,
  XTZUSDT: 0,
  ZILUSDT: 189.934,
  SAFEMOON_USDT: 32743900,
};

const CoinList = [];
for (const symbol in symbolList) {
  CoinList.push(new Coin(symbol, symbolList[symbol], amount[symbol]));
}

export default CoinList;
