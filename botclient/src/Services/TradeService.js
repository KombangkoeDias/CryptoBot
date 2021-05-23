import axios from "axios";
import serverURL from "../configs/serverURL";

const TradeService = {
  ExecuteTrade: async (symbol, exchange, amount, side, port) => {
    const url = "/coin/" + side;

    const respond = await axios.post(serverURL + url, {
      symbol: symbol,
      exchange: exchange,
      amount: amount,
      port: port,
    });

    if (!respond.data["error"]) {
      return true;
    }
    return false;
  },
};

export default TradeService;
