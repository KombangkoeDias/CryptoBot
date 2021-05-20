import React, { useState, useContext } from "react";
import CoinList from "../Coins/Coins";
import styles from "./BotPort.module.css";
import TradeComponent from "./SubComponents/TradeComponent/TradeComponent";
import { ThemeContext, themes } from "../Contexts/Theme";

const BotPort = () => {
  const value = useContext(ThemeContext);

  return (
    <React.Fragment>
      <div
        className="mt-3 "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h3 style={{ color: value.text }} className="mr-4">
          Manual Trade
        </h3>
      </div>
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          backgroundColor: value.background,
        }}
      >
        <TradeComponent port={"bot_port"} mode={"trade"} />
      </div>
    </React.Fragment>
  );
};

export default BotPort;
