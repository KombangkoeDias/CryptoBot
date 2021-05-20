import Coin from "../../Coins/CoinClass";
import store from "../../store/store";

const PriceFunctions = {
  calculateTotalHoldings: (tradingPair, amount, priceNow) => {
    if (tradingPair === "ETH") {
      return (
        priceNow *
        amount *
        store.getState().CoinList.filter((coin) => coin.symbol === "ETHUSDT")[0]
          .priceNow
      ).toFixed(2);
    } else {
      return (priceNow * amount).toFixed(2);
    }
  },
  calculateLargeGains: () => {
    let upCoins = store
      .getState()
      .CoinList.filter((coin) => coin.side === "up");
    upCoins = upCoins.sort((a, b) => b.percentage - a.percentage);
    return upCoins;
  },
  updateCoinList: (symbol, info) => {
    let the_coin = store
      .getState()
      .CoinList.filter((coin) => coin.symbol === symbol)[0];
    let i = store.getState().CoinList.indexOf(the_coin);
    let new_coin = new Coin(
      store.getState().CoinList[i].symbol,
      store.getState().CoinList[i].exchange,
      store.getState().CoinList[i].amount,
      info.basePrice,
      info.percentage,
      info.percentage_range,
      info.price_range,
      info.side,
      info.priceNow
    );
    let new_coin_list = [...store.getState().CoinList];
    new_coin_list[i] = new_coin;
    store.dispatch({ type: "update", payload: new_coin_list });
  },
};

export default PriceFunctions;
