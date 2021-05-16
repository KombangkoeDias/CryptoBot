import CoinList from "../../Coins/Coins";
import Coin from "../../Coins/CoinClass";
const PriceFunctions = {
  calculateTotalHoldings: (tradingPair, amount, priceNow) => {
    if (tradingPair === "ETH") {
      return (
        priceNow *
        amount *
        CoinList.filter((coin) => coin.symbol === "ETHUSDT")[0].priceNow
      ).toFixed(2);
    } else {
      return (priceNow * amount).toFixed(2);
    }
  },
  calculateLargeGains: () => {
    let upCoins = CoinList.filter((coin) => coin.side === "up");
    upCoins = upCoins.sort((a, b) => b.percentage - a.percentage);
    return upCoins;
  },
  updateCoinList: (symbol, info) => {
    let the_coin = CoinList.filter((coin) => coin.symbol === symbol)[0];
    let i = CoinList.indexOf(the_coin);
    let new_coin = new Coin(
      CoinList[i].symbol,
      CoinList[i].exchange,
      CoinList[i].amount,
      info.basePrice,
      info.percentage,
      info.percentage_range,
      info.price_range,
      info.side,
      info.priceNow
    );
    CoinList[i] = new_coin;
  },
};

export default PriceFunctions;
