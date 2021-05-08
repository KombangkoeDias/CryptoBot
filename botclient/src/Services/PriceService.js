import axios from "axios";
import serverURL from "../configs/serverURL";

const PriceService = {
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
};

export default PriceService;
