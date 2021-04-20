import axios from "axios";
import serverURL from "../../configs/serverURL";

const EverydayPricesService = {
  getPrice: async () => {
    try {
      const respond = await axios.get(serverURL + "/EverydayPrice");
      return respond.data;
    } catch (err) {
      console.log(err);
    }
  },
};

export default EverydayPricesService;
