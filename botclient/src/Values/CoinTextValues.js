import React from "react";
import Mode from "./CoinValueMode";

const CoinValues = (props) => {
  return (
    <React.Fragment>
      {props.mode === Mode.NORMAL && (
        <React.Fragment>
          {props.showname && props.symbol} : {props.price}{" "}
        </React.Fragment>
      )}
      {props.mode === Mode.HOLDINGS && (
        <>
          {props.amount} {props.showname && props.abbr}{" "}
          <i className="fa fa-long-arrow-alt-right"></i> ${" "}
          {parseFloat(props.amount * props.price).toFixed(4)}{" "}
        </>
      )}
      {props.up !== null && props.amount !== 0 ? (
        props.up ? (
          <i className="fa fa-caret-up" style={{ color: "green" }}></i>
        ) : (
          <i
            className="fa fa-caret-down"
            style={{ color: props.showbg ? "white" : "red" }}
          ></i>
        )
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default CoinValues;
