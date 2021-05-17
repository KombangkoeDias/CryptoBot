import React, { useState, useContext } from "react";
import CoinList from "../Coins/Coins";
import styles from "./BotPort.module.css";
import TradeComponent from "./SubComponents/TradeComponent/TradeComponent";
import { ThemeContext, themes } from "../Contexts/Theme";

const BotPort = () => {
  const [trade, setTrade] = useState(null);
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
      <div
        className="col-12 col-md-8 mt-4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className={"btn btn-primary mr-3 " + styles.buttonStyle}
          style={{
            backgroundColor: trade === "sell" ? value.selected : "grey",
            color: trade === "sell" ? value.text : "white",
            width: "100px",
          }}
          onClick={() => setTrade("sell")}
        >
          Sell
        </button>
        <button
          className={"btn btn-primary " + styles.buttonStyle}
          style={{
            backgroundColor: trade === "buy" ? value.selected : "grey",
            color: trade === "buy" ? value.text : "white",
            width: "100px",
          }}
          onClick={() => setTrade("buy")}
        >
          Buy
        </button>
      </div>
      {trade !== null && <TradeComponent trade={trade} />}
    </div>
  );
};

export default BotPort;
