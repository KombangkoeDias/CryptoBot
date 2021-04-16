import Coin from "./Coin";

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
  GT_USDT: "gateio",
  HOTUSDT: "binance",
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
  STORJUSDT: "binance",
  STPTUSDT: "binance",
  SXPUSDT: "binance",
  THETAUSDT: "binance",
  WANUSDT: "binance",
  XTZUSDT: "binance",
  ZILUSDT: "binance",
  SAFEMOON_USDT: "bitmart",
};

const CoinList = [];
for (const symbol in symbolList) {
  CoinList.push(new Coin(symbol, symbolList[symbol]));
}
export default CoinList;
