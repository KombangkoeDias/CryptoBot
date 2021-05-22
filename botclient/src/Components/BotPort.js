import React, { useState, useEffect, useContext } from "react";
import CoinList from "../Coins/Coins";
import styles from "./BotPort.module.css";
import TradeComponent from "./SubComponents/TradeComponent/TradeComponent";
import { ThemeContext, themes } from "../Contexts/Theme";
import { connect } from "react-redux";
import MapStateToProps from ".././Constants/MapStateToProps";
import MovingTradeInfo from "./SubComponents/TradeComponent/MovingTradeInfo";

const BotPort = (props) => {
  const value = useContext(ThemeContext);

  const [loaded, setLoaded] = useState(false);

  const [sortedByDateTransactionData, setSortedByDateTransactionData] =
    useState([]);

  if (props.TradeData.length !== 0 && props.TransactionData.length !== 0) {
    if (!loaded) {
      setLoaded(true);
    }
    props.TransactionData.sort((a, b) => {
      return b.time - a.time;
    });
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      {props.TradeData.length !== 0 && <h2>Loaded</h2>}
      {loaded && (
        <div className="row">
          <div className="col"></div>
          <div className="col">
            {props.TransactionData.map((transaction) => {
              return <MovingTradeInfo transaction={transaction} />;
            })}
          </div>
        </div>
      )}
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
    </div>
  );
};

export default connect(MapStateToProps)(BotPort);
