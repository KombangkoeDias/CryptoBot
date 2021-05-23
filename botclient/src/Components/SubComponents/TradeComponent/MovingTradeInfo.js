import React, { useState } from "react";
import CSS from "../../../Constants/ConstantCSS";
import styles from "./MovingTradeInfo.module.css";
import CoinLogo from "../../CoinImg/CoinLogo";

const MovingTradeInfo = (props) => {
  const transaction = props.transaction;
  const move = props.move;

  const [timeToMove, setTimeToMove] = useState(false);

  setTimeout(() => {
    setTimeToMove(true);
  }, move * 500);

  console.log(transaction);
  return (
    <div className="row mr-3 ml-3 mb-3">
      <div
        className={"col " + styles.moving}
        style={{
          boxShadow: CSS.boxShadow,
          border: "1px solid white",
          borderRadius: "10px",
          minHeight: "50px",
          padding: "20px",
          backgroundColor:
            transaction.side === "buy" ? "lightgreen" : "darkred",
          display: timeToMove ? "block" : "none",
        }}
      >
        <div style={{ color: "white" }}>
          <div className="row">
            <div className={"col " + styles.center}>
              {" "}
              <CoinLogo logo={transaction.logo} />
              {transaction.symbol}
            </div>
            <div className={"col " + styles.center}>
              price : {transaction.price}
            </div>
            <div className={"col " + styles.center}>
              amount : {transaction.amount}
            </div>
          </div>
          {/* <div className="row">
            <div className={"col " + styles.center}>
              exchange : {transaction.exchange}
            </div>
            <div className={"col " + styles.center}>
              amount : {transaction.amount}
            </div>
            <div className={"col " + styles.center}>
              at {transaction.time.toLocaleString("en-GB")}
            </div>
          </div> */}

          {/* <h5 style={{ color: "white" }}>
          {transaction.price} {transaction.side} {transaction.exchange}{" "}
          {transaction.amount} {transaction.time.toLocaleString("en-GB")}
        </h5> */}
        </div>
      </div>
    </div>
  );
};

export default MovingTradeInfo;
