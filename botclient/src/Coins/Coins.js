import Coin from "./CoinClass";
import CoinService from "../Services/CoinService";

const symbolList = {
  // ADAUSDT: "binance",
  // ATOMUSDT: "binance",
  // BANDUSDT: "binance",
  // BNBUSDT: "binance",
  // BTCUSDT: "binance",
  // CAKEUSDT: "binance",
  // DENTUSDT: "binance",
  // DOTUSDT: "binance",
  // ENJUSDT: "binance",
  // ETHUSDT: "binance",
  // GT_USDT: "gate.io",
  // HOTUSDT: "binance",
  // INJUSDT: "binance",
  // KSMUSDT: "binance",
  // KYL_USDT: "gate.io",
  // LINKUSDT: "binance",
  // LITUSDT: "binance",
  // ONEUSDT: "binance",
  // PBR_USDT: "gate.io",
  // PCX_USDT: "gate.io",
  // PKF_USDT: "gate.io",
  // POLK_USDT: "gate.io",
  // POLS_USDT: "gate.io",
  // // SOLUSDT: "binance",
  // // STPTUSDT: "binance",
  // // SXPUSDT: "binance",
  // // ZILUSDT: "binance",
  // // SAFEMOON_USDT: "bitmart",
  // // RING_USDT: "gate.io",
  // // PHABUSD: "binance",
  // // eRSDL_ETH: "bitmart",
};

const amount = {
  // ADAUSDT: 712.486,
  // ATOMUSDT: 4.6377,
  // BANDUSDT: 0,
  // BNBUSDT: 0.492535,
  // BTCUSDT: 0,
  // CAKEUSDT: 14.499,
  // DENTUSDT: 4582.35,
  // DOTUSDT: 30.0447,
  // ENJUSDT: 10.4895,
  // ETHUSDT: 0.042082,
  // FILUSDT: 0,
  // GT_USDT: 5.4619,
  // HOTUSDT: 4092,
  // INJUSDT: 0.76,
  // KSMUSDT: 0.652528,
  // KYL_USDT: 34.1944,
  // LINKUSDT: 1.25373,
  // LITUSDT: 7.507,
  // ONEUSDT: 346.911,
  // PBR_USDT: 131.898,
  // PCX_USDT: 4.6117,
  // PKF_USDT: 32.934,
  // POLK_USDT: 29.94,
  // POLS_USDT: 16.467,
  // SOLUSDT: 10.413,
  // STORJUSDT: 0,
  // STPTUSDT: 273.127,
  // SXPUSDT: 8.90309,
  // XTZUSDT: 0,
  // ZILUSDT: 189.934,
  // SAFEMOON_USDT: 27357889,
  // RING_USDT: 452.918,
  // PHABUSD: 54.6449,
  // eRSDL_ETH: 38,
};

// const avg_buy = {
//   ADAUSDT: 0.569,
//   ATOMUSDT: null,
//   BANDUSDT: null,
//   BNBUSDT: 307.04,
//   BTCUSDT: null,
//   CAKEUSDT: 13.62,
//   DENTUSDT: 0.013,
//   DOTUSDT: 16.49,
//   ENJUSDT: 3.28,
//   ETHUSDT: 1584.21,
//   GT_USDT: 3.86,
//   HOTUSDT: null,
//   INJUSDT: 16.37,
//   KSMUSDT: 256.53,
//   KYL_USDT: 1.24,
//   LINKUSDT: 26.58,
//   LITUSDT: 8.3,
//   ONEUSDT: null,
//   PBR_USDT: 0.513,
//   PCX_USDT: 14.32,
//   PKF_USDT: 2,
//   POLK_USDT: 2.2,
//   POLS_USDT: 3.92,
//   SOLUSDT: 4.1,
//   STPTUSDT: 0.1222,
//   SXPUSDT: 3.37,
//   ZILUSDT: 0.173744,
//   SAFEMOON_USDT: 0.000001,
//   //ERSDLETH: "bitmart",
// };

let CoinList = [];
for (const symbol in symbolList) {
  CoinList.push(new Coin(symbol, symbolList[symbol], amount[symbol]));
}

async function getCoinList() {
  let anotherCoinList = [];
  const data = await CoinService.getWatchList();
  let i = 0;
  for (const symbol in data) {
    anotherCoinList.push(
      new Coin(symbol, data[symbol]["exchange"], data[symbol]["amount"])
    );
    i = i + 1;
  }
  return anotherCoinList;
}

getCoinList().then((value) => {
  //console.log(value);
});

export default CoinList;
