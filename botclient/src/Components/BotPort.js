import React from "react";
import CoinList from "../Coins/Coins";

const BotPort = () => {
  return CoinList.map((coin) => {
    return (
      <p>
        {coin.symbol} : {coin.amount} {coin.abbr.toUpperCase()} {"=>"} ${" "}
        {coin.amount * coin.priceNow}
      </p>
    );
  });
};

export default BotPort;
