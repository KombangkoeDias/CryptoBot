import React, { useState, useContext, useEffect } from "react";
import CoinService from "../../../Services/CoinService";
import CSS from "../../../Constants/ConstantCSS";
import { ThemeContext, themes } from "../../../Contexts/Theme";

const BuyComponent = (props) => {
  const [symbol, setSymbol] = useState("");
  const [pair, setPair] = useState("");
  const [exchange, setExchange] = useState("binance");
  const [amount, setAmount] = useState("");
  const [exist, setExist] = useState(null);
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

  return (
    <div
      className="col-10 offset-1 offset-lg-0 col-lg-8 mt-4 ml-4 mr-4"
      style={{
        border: "1px solid " + (props.trade === "buy" ? "lightgreen" : "red"),
        borderRadius: "10px",
        boxShadow: CSS.boxShadow,
        backgroundColor: value.card,
        color: value.text,
        minWidth: "400px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        {props.trade === "buy" ? "Buy" : "Sell"}
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
          style={{ textTransform: "uppercase" }}
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
          style={{ textTransform: "uppercase" }}
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
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="row" style={{ padding: "0px 10px 0px 10px" }}>
        <div className="col">
          {(symbol === "" || exchange === "" || pair == "") && (
            <p>Enter symbol, pair and choose exchange</p>
          )}
          {exist === null && symbol !== "" && exchange !== "" && pair != "" && (
            <p>Searching...</p>
          )}
          {exist !== null && (
            <div>
              {symbol !== "" && exchange !== "" && pair != "" && (
                <p style={{ color: exist ? "lightgreen" : "darkred" }}>
                  {exist ? "Symbol Existed!" : "Symbol Not Existed!"}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyComponent;
