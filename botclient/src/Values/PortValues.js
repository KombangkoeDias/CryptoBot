import React, { useState } from "react";
import axios from "axios";
import serverURL from "../configs/serverURL";

const PortValue = () => {
  const [value, setValue] = useState(0);

  const getPortValue = async () => {
    try {
      const respond = await axios.get(serverURL + "/test");
      setValue(respond.data.port.toFixed(4));
    } catch (err) {}
  };

  getPortValue();

  return <span>{value}</span>;
};

export default PortValue;
