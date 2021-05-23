import React, { useState, useEffect, useContext } from "react";
import CoinList from "../Coins/Coins";
import styles from "./BotPort.module.css";
import TradeComponent from "./SubComponents/TradeComponent/TradeComponent";
import { ThemeContext, themes } from "../Contexts/Theme";
import { connect } from "react-redux";
import MapStateToProps from ".././Constants/MapStateToProps";
import MovingTradeInfo from "./SubComponents/TradeComponent/MovingTradeInfo";
import { fetchTradeData } from "../store/Reducers/CoinListReducers";
import store from "../store/store";

const BotPort = (props) => {
  const value = useContext(ThemeContext);

  useEffect(() => {
    setInterval(() => {
      store.dispatch(fetchTradeData);
    }, 2000);
  }, []);

  const [loaded, setLoaded] = useState(false);

  const [sortedByDateTransactionData, setSortedByDateTransactionData] =
    useState([]);

  if (props.TradeData.length !== 0 && props.TransactionData.length !== 0) {
    if (!loaded) {
      setLoaded(true);
    }
    if (props.TransactionData.length !== sortedByDateTransactionData.length) {
      setSortedByDateTransactionData(
        [...props.TransactionData].sort((a, b) => {
          return b.time - a.time;
        })
      );
    }
  }
  if (props.TradeData[0] === null) {
    if (!loaded) {
      setLoaded(true);
    }
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="row mt-3 ">
        <div className="col">
          <div
            className={"col " + styles.subcomponent}
            style={{
              minHeight: "500px",
              maxHeight: "500px",
              overflowY: "scroll",
              color: value.text,
            }}
          >
            <h4 style={{ textAlign: "center" }} className="mb-3">
              Portfolio
            </h4>
            {loaded &&
              props.TradeData[0] !== null &&
              props.TradeData.map((data) => {
                return (
                  <p>
                    {data.port.symbol} {data.port.amount}{" "}
                    {data.port.average_buy}{" "}
                    {parseFloat(data.profit.profit).toFixed(2)}
                  </p>
                );
              })}
            {loaded && props.TradeData[0] === null && (
              <h5 style={{ color: value.text, textAlign: "center" }}>
                No coin in portfolio yet
              </h5>
            )}
            {!loaded && (
              <div className={styles.center}>
                <div
                  className="spinner-border"
                  role="status"
                  style={{ color: value.text }}
                ></div>
              </div>
            )}
          </div>
        </div>
        <div
          className={"col " + styles.subcomponent}
          style={{
            minHeight: "500px",
            maxHeight: "500px",
            overflowY: "scroll",
            color: value.text,
          }}
        >
          <h4 style={{ textAlign: "center" }} className="mb-3">
            Latest Transactions
          </h4>
          {loaded &&
            props.TradeData[0] !== null &&
            sortedByDateTransactionData.map((transaction, i) => {
              return <MovingTradeInfo transaction={transaction} move={i} />;
            })}
          {loaded && props.TradeData[0] === null && (
            <h5 style={{ color: value.text, textAlign: "center" }}>
              No Transactions yet
            </h5>
          )}
          {!loaded && (
            <div className={styles.center}>
              <div
                className="spinner-border"
                role="status"
                style={{ color: value.text }}
              ></div>
            </div>
          )}
        </div>
        )
      </div>

      <div
        className="mt-3 "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h3 style={{ color: value.text }}>Manual Trade</h3>
      </div>
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: value.background,
        }}
      >
        <TradeComponent port={"bot_port"} mode={"trade"} />
      </div>
    </div>
  );
};

export default connect(MapStateToProps)(BotPort);
