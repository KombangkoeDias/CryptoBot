import React, { useState } from "react";
import axios from "axios";
import serverURL from "../configs/serverURL";

const AllCoinsPrices = () => {
  const [AllPrices, setAllPrices] = useState({});

  const getPortValue = async () => {
    try {
      const respond = await axios.get(serverURL + "/all");
      console.log(respond.data);
      setAllPrices(respond.data);
    } catch (err) {}
  };

  getPortValue();
  return Object.keys(AllPrices).map((key) => {
    return (
      <p>
        {key} : {AllPrices[key]}
      </p>
    );
  });
};

export default AllCoinsPrices;
