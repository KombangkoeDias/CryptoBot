import React from "react";
import CoinList from "../Coins/Coins";

const BotPort = () => {
  return CoinList.map((coin) => {
    return (
      <p>
        {coin.symbol} : {coin.amount}
      </p>
    );
  });
};

export default BotPort;
