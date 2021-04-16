import React from "react";
import CoinList from "../Coins/Coins";
import CoinPrice from "../Values/CoinPrice";

const Prices = () => {
  return (
    <React.Fragment>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h2>Coins in watchlist</h2>
      </div>
      <div className="row ml-2 mr-2 mt-4">
        {CoinList.map((coin) => (
          <div
            className="col-3 mb-3"
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CoinPrice
              symbol={coin.symbol}
              exchange={coin.exchange}
              key={coin.symbol}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Prices;
