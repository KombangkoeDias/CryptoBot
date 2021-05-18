import React, { useState, useContext, useEffect } from "react";
import CoinService from "../../../Services/CoinService";
import CSS from "../../../Constants/ConstantCSS";
import { ThemeContext, themes } from "../../../Contexts/Theme";
import styles from "./TradeComponent.module.css";
import TradeService from "../../../Services/TradeService";

const BuyComponent = (props) => {
  const [symbol, setSymbol] = useState("");
  const [trade, setTrade] = useState("");
  const [pair, setPair] = useState("");
  const [exchange, setExchange] = useState("binance");
  const [amount, setAmount] = useState("");
  const [exist, setExist] = useState(null);
  const [LoadExecute, setLoadExecute] = useState(false);
  const [bounce, setBounce] = useState(false);

  const [symbolOk, setSymbolOk] = useState(true);
  const [pairOk, setPairOk] = useState(true);
  const [amountOk, setAmountOk] = useState(true);

  const value = useContext(ThemeContext);

  const CreateSymbol = () => {
    switch (exchange) {
      case "binance":
        return symbol + pair;
      case "gate.io":
        return symbol + "_" + pair;
      case "bitmart":
        return symbol + "_" + pair;
    }
  };

  useEffect(async () => {
    if (symbol !== "" && exchange !== "" && pair != "") {
      setExist(null);
      const fullSymbol = CreateSymbol();
      const isExist = await CoinService.checkIfExist(fullSymbol, exchange);
      setExist(isExist);
    } else {
      setExist(null);
    }
  }, [symbol, pair, exchange]);

  useEffect(() => {
    if (trade !== "") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    //window.scrollTo(0, document.body.scrollHeight);
  }, [trade]);

  const ValidateInput = () => {
    if (symbol === "") {
      setSymbolOk(false);
      setTimeout(() => {
        setSymbolOk(true);
      }, 1000);
    }
    if (pair === "") {
      setPairOk(false);
      setTimeout(() => {
        setPairOk(true);
      }, 1000);
    }
    if (amount === "") {
      setAmountOk(false);
      setTimeout(() => {
        setAmountOk(true);
      }, 1000);
    }
  };

  const ExecuteTrade = async () => {
    ValidateInput();
    if (!exist || amount === "") {
      setBounce(true);
      setTimeout(() => setBounce(false), 1000);
      return;
    }

    setLoadExecute(true);
    await TradeService.ExecuteTrade(
      CreateSymbol(),
      exchange,
      amount,
      trade,
      props.port
    );
    setLoadExecute(false);
  };

  return (
    <React.Fragment>
      <div
        className="col-12 col-md-8 mt-4"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "10px",
        }}
      >
        <button
          className={"btn btn-primary mr-3 " + styles.buttonStyle}
          style={{
            backgroundColor: trade === "sell" ? value.selected : "grey",
            color: trade === "sell" ? value.text : "white",
            width: "100px",
          }}
          onClick={() => {
            setTrade("sell");
          }}
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
          onClick={() => {
            setTrade("buy");
          }}
        >
          Buy
        </button>
      </div>

      {trade !== "" && (
        <div
          className="col-10 offset-1 offset-lg-0 col-lg-8 mt-4 ml-4 mr-4"
          style={{
            border: "1px solid " + (trade === "buy" ? "lightgreen" : "red"),
            borderRadius: "10px",
            boxShadow: CSS.boxShadow,
            backgroundColor: value.card,
            color: value.text,
            minWidth: "400px",
            marginBottom: "35px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            {trade === "buy" ? "Buy" : "Sell"}
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
              padding: "0px 10px 10px 10px",
            }}
            className="row"
          >
            <label htmlFor="symbol" className="col">
              Symbol
            </label>
            <input
              id="symbol"
              type="text"
              value={symbol}
              className="col"
              style={{
                textTransform: "uppercase",
                border: symbolOk
                  ? "2px solid transparent"
                  : "2px solid darkred",
              }}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
            <label htmlFor="pair" className="col">
              Pair
            </label>
            <input
              id="pair"
              type="text"
              value={pair}
              className="col"
              style={{
                textTransform: "uppercase",
                border: pairOk ? "2px solid transparent" : "2px solid darkred",
              }}
              onChange={(e) => setPair(e.target.value.toUpperCase())}
            />
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
              padding: "0px 10px 10px 10px",
            }}
          >
            <label htmlFor="exchange" className="col">
              Exchange
            </label>
            <select
              id="exchange"
              name="exchange"
              value={exchange}
              onChange={(e) => setExchange(e.target.value)}
              className="col"
            >
              <option value="binance">binance</option>
              <option value="gate.io">gate.io</option>
              <option value="bitmart">bitmart</option>
            </select>
            <label htmlFor="amount" className="col">
              Amount
            </label>
            <input
              id="amount"
              type="text"
              value={amount}
              className="col"
              style={{
                border: amountOk
                  ? "2px solid transparent"
                  : "2px solid darkred",
              }}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="row mb-2" style={{ padding: "0px 10px 0px 10px" }}>
            <div className={"col "}>
              {(symbol === "" || exchange === "" || pair == "") && (
                <p className={bounce ? styles.bounce : ""}>
                  Enter symbol, pair and choose exchange
                </p>
              )}
              {exist === null &&
                symbol !== "" &&
                exchange !== "" &&
                pair != "" && (
                  <p className={bounce ? styles.bounce : ""}>Searching...</p>
                )}
              {exist !== null && (
                <div>
                  {symbol !== "" && exchange !== "" && pair != "" && (
                    <p
                      className={bounce ? styles.bounce : ""}
                      style={{ color: exist ? "lightgreen" : "darkred" }}
                    >
                      {" "}
                      {exist ? "Symbol Existed!" : "Symbol Not Existed!"}
                    </p>
                  )}
                </div>
              )}
            </div>
            {LoadExecute && (
              <div className="spinner-border" role="status"></div>
            )}
            <div
              className="col"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {" "}
              <button
                className={styles.executeButton}
                onClick={() => ExecuteTrade()}
              >
                Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BuyComponent;
