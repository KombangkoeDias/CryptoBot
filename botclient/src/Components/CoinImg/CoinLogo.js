import React from "react";

const CoinLogo = (props) => {
  let coin = props.coin;
  return (
    <img
      src={
        "/Asset/logos/" +
        coin.abbr +
        (coin.abbr === "pols" || coin.abbr === "safemoon" ? ".jpeg" : ".png")
      }
      width="30"
      height="30"
      className="mr-1"
      alt={coin.symbol}
    ></img>
  );
};

export default CoinLogo;
