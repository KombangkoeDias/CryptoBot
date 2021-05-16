import CoinList from "../../Coins/Coins";
const CalculatePriceFunctions = {
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
};

export default CalculatePriceFunctions;
