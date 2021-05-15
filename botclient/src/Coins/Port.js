import CoinList from "./Coins";

class Portfolio {
  constructor(CoinList) {
    this.CoinList = CoinList;
    this.totalValue = this.getTotalValue();
  }

  getTotalValue() {
    let port = 0;
    for (let i = 0; i < this.CoinList.length; ++i) {
      port =
        port + this.CoinList[i].amount * this.CoinList[i].priceNow.toFixed(2);
    }
    this.totalValue = port;
    return this.totalValue;
  }
}

const PortfolioFunctions = {
  getTotalValue: () => {
    let totalvalue = 0;
    for (let i = 0; i < CoinList.length; ++i) {
      totalvalue += CoinList[i].amount * CoinList[i].priceNow.toFixed(2);
    }
    return totalvalue.toFixed(2);
  },
  checkIfLoaded: () => {
    let loaded = true;
    for (let i = 0; i < CoinList.length; ++i) {
      if (CoinList[i].priceNow === 0) {
        loaded = false;
      }
    }
    return loaded;
  },
};

export default PortfolioFunctions;
