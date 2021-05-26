import React, { useState, useEffect, useContext } from "react";
import CoinList from "../Coins/Coins";
import styles from "./BotPort.module.css";
import TradeComponent from "./SubComponents/TradeComponent/TradeComponent";
import { ThemeContext, themes } from "../Contexts/Theme";
import { connect } from "react-redux";
import MapStateToProps from ".././Constants/MapStateToProps";
import MovingTradeInfo from "./SubComponents/TradeComponent/MovingTradeInfo";
import TradeService from "../Services/TradeService";
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

  const [filteredTransactionData, setFilteredTransactionData] = useState([]);

  const [filter, setFilter] = useState("");

  const updateFilter = (value) => {
    setFilter(value);
    console.log(filteredTransactionData);
  };

  const sorted = [...props.TransactionData].sort((a, b) => {
    return b.time - a.time;
  });

  if (props.TradeData.length !== 0 && props.TransactionData.length !== 0) {
    if (!loaded) {
      setLoaded(true);
    }
    if (props.TransactionData.length !== sortedByDateTransactionData.length) {
      setSortedByDateTransactionData(sorted);
      setFilteredTransactionData(sorted);
    }
  }

  useEffect(() => {
    if (filter === "") {
      setFilteredTransactionData(sorted);
    } else {
      const filtered = sorted.filter(
        (transaction) => transaction.symbol.search(filter.toUpperCase()) !== -1
      );
      console.log(filtered.length);
      if (filteredTransactionData.length !== filtered.length) {
        setFilteredTransactionData([...filtered]);
      }
    }
  }, [filter]);

  console.log(props.TradeData);

  if (props.TradeData[0] === null) {
    if (!loaded) {
      setLoaded(true);
    }
  }

  return (
    <div style={{ overflowX: "hidden", backgroundColor: value.background }}>
      <div className="row mt-3 ">
        <div
          className={"col " + styles.subcomponent}
          style={{
            minHeight: "500px",
            maxHeight: "500px",
            overflowY: "scroll",
            color: value.text,
            borderRight: "2px solid gold",
          }}
        >
          <h4 style={{ textAlign: "center" }} className="mb-3">
            Portfolio
          </h4>
          {loaded &&
            props.TradeData[0] !== null &&
            props.TradeData.sort((a, b) => b.port.amount - a.port.amount)
              .filter((a) => a.port.amount !== 0)
              .map((data, i) => {
                return (
                  <React.Fragment>
                    <MovingTradeInfo port_data={data.port} move={i} />
                    {/* {parseFloat(data.profit.profit).toFixed(2)} */}
                  </React.Fragment>
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
          <div className={"row mb-3 " + styles.center}>
            <label htmlFor="filter" className="mr-3">
              filter by
            </label>
            <input
              id="filter"
              type="text"
              placeholder="Enter coin name"
              value={filter}
              onChange={(e) => updateFilter(e.target.value)}
              style={{ textTransform: "uppercase" }}
            />
          </div>

          {loaded &&
            props.TradeData[0] !== null &&
            filteredTransactionData.map((transaction, i) => {
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
        }}
      >
        <TradeComponent port={"bot_port"} mode={"trade"} />
      </div>
      {/* <div className={"row mb-2 " + styles.center}>
        <button
          className="btn btn-danger"
          onClick={() => TradeService.ClearPort("bot_port")}
          style={{ padding: "10px", borderRadius: "10px" }}
        >
          Clear All Trade
        </button>
      </div> */}
    </div>
  );
};

export default connect(MapStateToProps)(BotPort);
