import axios from "axios";
import serverURL from "../configs/serverURL";
import priceURL from "../configs/priceserverURL";

const CoinService = {
  getBasePrice: async (symbol) => {
    const respond = await axios.get(serverURL + "/basePrice", {
      params: {
        symbol: symbol,
      },
    });
    return respond.data.price;
  },
  getInfo: async (symbol, exchange) => {
    const respond = await axios.get(priceURL + "/coin/info", {
      params: {
        symbol: symbol,
        exchange: exchange,
      },
    });
    return respond.data;
  },
  checkIfExist: async (symbol, exchange) => {
    const respond = await axios.post(serverURL + "/coin/checkIfExist", {
      symbol: symbol,
      exchange: exchange,
    });
    if (respond.data["exist"]) {
      return true;
    }
    return false;
  },
  getWatchList: async () => {
    const respond = await axios.get(serverURL + "/watchlist/get");
    return respond.data;
  },
  manageCoin: async (symbol, exchange, amount, side) => {
    const respond = await axios.post(serverURL + "/watchlist/" + side, {
      symbol: symbol,
      exchange: exchange,
      amount: amount,
    });
    if (respond.data["inserted"] || respond.data["deleted"]) {
      return true;
    } else {
      return false;
    }
  },
};

export default CoinService;
