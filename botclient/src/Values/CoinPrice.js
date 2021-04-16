import React, { useState } from "react";
import axios from "axios";
import serverURL from "../configs/serverURL";

const CoinPrice = (props) => {
  const symbol = props.symbol;
  const [price, setPrice] = useState(0);

  async function getPrice() {
    try {
      const respond = await axios.get(
        serverURL +
          "/coin/price?symbol=" +
          symbol +
          "&exchange=" +
          props.exchange
      );
      setPrice(parseFloat(respond.data.price).toFixed(4));
    } catch (err) {}
  }

  async function getPriceRepeatedly() {
    try {
      await getPrice();
      setTimeout(getPriceRepeatedly, 1000);
    } catch (err) {}
  }

  getPriceRepeatedly();

  return (
    <p>
      {symbol} : {price}
    </p>
  );
};

export default CoinPrice;
