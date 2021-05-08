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
};

export default PriceService;
