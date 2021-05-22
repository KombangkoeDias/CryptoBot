import axios from "axios";
import serverURL from "../configs/serverURL";

const TradeDataService = {
  get_all_trade_data: async (port) => {
    const respond = await axios.post(serverURL + "/port/trade_data/all", {
      port: port,
    });
    return respond.data["trade_data"];
  },
};

export default TradeDataService;
