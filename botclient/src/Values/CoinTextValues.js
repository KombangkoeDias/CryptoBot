import React from "react";
import Mode from "./CoinValueMode";

const CoinValues = (props) => {
  function Caret() {
    return props.up !== null && props.amount !== 0 ? (
      props.up ? (
        <i className="fa fa-caret-up" style={{ color: "green" }}></i>
      ) : (
        <i
          className="fa fa-caret-down"
          style={{
            color:
              props.mode === Mode.MODAL
                ? "red"
                : props.showbg
                ? "white"
                : "red",
          }}
        ></i>
      )
    ) : (
      <></>
    );
  }

  return (
    <React.Fragment>
      {props.mode === Mode.NORMAL && (
        <React.Fragment>
          {props.showname && props.symbol} : {props.priceNow}
          {"  "}
        </React.Fragment>
      )}
      {props.mode === Mode.HOLDINGS && (
        <>
          {props.amount} {props.showname && props.abbr}{" "}
          <i className="fa fa-long-arrow-alt-right"></i> ${" "}
          {parseFloat(props.amount * props.priceNow).toFixed(4)}{" "}
        </>
      )}
      {props.mode === Mode.MODAL && (
        <React.Fragment>
          {props.showname && props.symbol} : {props.priceNow} USDT
          <br />
          Today : {props.side} {props.percentage}
          {"% "}
        </React.Fragment>
      )}
      {Caret()}
    </React.Fragment>
  );
};

export default CoinValues;
