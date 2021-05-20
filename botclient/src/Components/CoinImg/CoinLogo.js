import React from "react";
import { connect } from "react-redux";
import MapStateToProps from "../../Constants/MapStateToProps";

const CoinLogo = (props) => {
  let coin = props.coin;
  return (
    <img
      src={props.LogoList[coin.symbol]}
      width="30"
      height="30"
      className="mr-1"
      alt={coin.symbol}
    ></img>
  );
};

export default connect(MapStateToProps)(CoinLogo);
