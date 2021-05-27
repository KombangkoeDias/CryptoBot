import React, { useState, useContext } from "react";
import CSS from "../../../Constants/ConstantCSS";
import styles from "./MovingTradeInfo.module.css";
import CoinLogo from "../../CoinImg/CoinLogo";
import { ThemeContext, themes } from "../../../Contexts/Theme";

const CalculateTimeDiff = (time) => {
  var midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  const OneDay = 1000 * 60 * 60 * 24;
  const OneHour = 1000 * 60 * 60;

  if (time.getDate() == midnight.getDate()) {
    return "Today at " + time.toLocaleTimeString();
  } else if (time - midnight < -OneDay && time - midnight > -2 * OneDay) {
    return "2 days ago at " + time.toLocaleTimeString();
  } else if (time - midnight < 0 && time - midnight > -OneDay) {
    return "yesterday at " + time.toLocaleTimeString();
  } else {
    var month = time.getUTCMonth() + 1;
    var day = time.getUTCDate();
    var year = time.getUTCFullYear();
    return day + "/" + month + "/" + year + " at " + time.toLocaleTimeString();
  }
};

const MovingTradeInfo = (props) => {
  const transaction = props.transaction;
  const port_data = props.port_data;
  const value = useContext(ThemeContext);
  const move = props.move;

  const [timeToMove, setTimeToMove] = useState(false);

  setTimeout(() => {
    setTimeToMove(true);
  }, move * 500);

  return (
    <div className="row mr-3 ml-3 mb-3">
      <div
        className={
          "col " +
          (transaction !== undefined ? styles.moving : styles.leftMoving)
        }
        style={{
          boxShadow: value === themes.dark ? CSS.darkBoxShadow : CSS.boxShadow,
          border: "1px solid white",
          borderRadius: "10px",
          minHeight: "50px",
          padding: "20px",
          backgroundColor:
            transaction !== undefined
              ? transaction.side === "buy"
                ? value === themes.dark
                  ? "darkgreen"
                  : "lightgreen"
                : "darkred"
              : port_data !== undefined
              ? "gray"
              : "white",
          display: timeToMove ? "block" : "none",
        }}
      >
        {transaction !== undefined && (
          <div style={{ color: value.text }}>
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
            <p
              style={{ position: "absolute", right: "10px", fontSize: "10px" }}
            >
              {CalculateTimeDiff(transaction.time)}
            </p>
          </div>
        )}
        {port_data !== undefined && (
          <div style={{ color: value.text }}>
            <div className="row">
              <div className={"col " + styles.center}>
                <CoinLogo logo={port_data.logo} />
                {port_data.symbol}
              </div>
              <div className={"col " + styles.center}>
                {port_data.average_buy}
              </div>
              <div className={"col " + styles.center}>
                holdings : {port_data.amount}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovingTradeInfo;
