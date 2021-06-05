import React from "react";
import { connect } from "react-redux";
import MapStateToProps from "../../Constants/MapStateToProps";

const CoinLogo = (props) => {
  let coin = props.coin;
  let logo = props.logo;
  return (
    <img
      src={!logo ? props.LogoList[coin.symbol] : props.logo}
      width="30"
      height="30"
      className="mr-1"
      alt={coin ? coin.symbol : props.logo}
    ></img>
  );
};

export default connect(MapStateToProps)(CoinLogo);
