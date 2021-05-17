import axios from "axios";
import serverURL from "../configs/serverURL";

const CoinService = {
  getBasePrice: async (symbol) => {
    const respond = await axios.get(serverURL + "/basePrice", {
      params: {
        symbol: symbol,
      },
    });
    return respond.data.price;
  },
  getInfo: async (symbol) => {
    const respond = await axios.get(serverURL + "/coin/info", {
      params: {
        symbol: symbol,
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
};

export default CoinService;
