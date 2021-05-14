import React from "react";
import Mode from "../../Values/CoinValueMode";

function Caret(props) {
  return props.up !== null && props.amount !== 0 ? (
    props.up ? (
      <i className="fa fa-caret-up" style={{ color: "green" }}></i>
    ) : (
      <i
        className="fa fa-caret-down"
        style={{
          color:
            props.mode === Mode.MODAL ? "red" : props.showbg ? "white" : "red",
        }}
      ></i>
    )
  ) : (
    <i className="fa fa-caret-up" style={{ color: "transparent" }}></i>
  );
}

export default Caret;
