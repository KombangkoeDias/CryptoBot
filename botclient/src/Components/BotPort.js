import React, { useState, useContext } from "react";
import CoinList from "../Coins/Coins";
import styles from "./BotPort.module.css";
import TradeComponent from "./SubComponents/TradeComponent/TradeComponent";
import { ThemeContext, themes } from "../Contexts/Theme";

const BotPort = () => {
  const value = useContext(ThemeContext);
  return (
    <div
      className="row"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: value.background,
      }}
    >
      <TradeComponent port={"bot_port"} />
    </div>
  );
};

export default BotPort;
