import axios from "axios";
import serverURL from "../configs/serverURL";
import store from "../store/store";

const TradeService = {
  ExecuteTrade: async (symbol, exchange, amount, side, port, price) => {
    const url = "/coin/" + side;

    const respond = await axios.post(serverURL + url, {
      symbol: symbol,
      exchange: exchange,
      amount: amount,
      port: port,
      buy_price: price, // just add both buy and sell price to avoid complicated code.
      sell_price: price,
    });

    if (!respond.data["error"]) {
      return true;
    }
    return false;
  },

  ClearPort: async (port) => {
    const url = "/port/remove";
    const respond = await axios.post(serverURL + url, { port: port });
    if (respond.data["removed"]) {
      return true;
    } else {
      return false;
    }
  },
};

export default TradeService;
