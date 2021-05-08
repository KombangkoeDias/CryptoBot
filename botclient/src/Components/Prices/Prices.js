import React, { useEffect } from "react";
import Coin from "../../Coins/CoinClass";
import CoinList from "../../Coins/Coins";
import PriceCard from "./PriceCard";
import Mode from "../../Values/CoinValueMode";
import $ from "jquery";

const Prices = (props) => {
  function addNewCoin() {
    const symbol = $("#symbol").val();
    const pair = $("#pair").val();
    const exchange = $("#exchange").val();
    CoinList.push(new Coin(symbol + pair, exchange));
    console.log(CoinList);
  }

  function updateCoinList(i, info) {
    let new_coin = new Coin(
      CoinList[i].symbol,
      CoinList[i].exchange,
      CoinList[i].amount,
      info.basePrice,
      info.percentage,
      info.percentage_range,
      info.price_range,
      info.side,
      info.priceNow
    );
    CoinList[i] = new_coin;
  }

  return (
    <React.Fragment>
      <div style={{ width: "100vw", overflowX: "hidden" }}>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h2>Coins in watchlist</h2>
        </div>
        <div className="row ml-2 mr-2 mt-4">
          {CoinList.map((coin, i) => (
            <div
              className="col-3 mb-3"
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
              key={coin.symbol}
            >
              <PriceCard
                updateCoinList={(info) => updateCoinList(i, info)}
                showbg={true}
                showname={true}
                key={coin.symbol}
                symbol={coin.symbol}
                amount={coin.amount}
                mode={Mode.NORMAL}
                abbr={coin.abbr}
              />
            </div>
          ))}
        </div>
        {/* <div className="row ml-3">
            <h3 style={{ width: "100vw" }}>Add a new coin into watchlist</h3>
            <div className="mr-3">
              <label htmlFor="symbol" className="mr-3">
                symbol
              </label>
              <input id="symbol" placeholder="enter coin symbol" />
            </div>
            <div className="mr-3">
              <label htmlFor="pair" className="mr-3">
                pair
              </label>
              <select id="pair" defaultValue="select a pair">
                <option value="select a pair">select a pair</option>
                <option value="USDT">USDT</option>
                <option value="BUSD">BUSD</option>
                <option value="USDC">USDC</option>
              </select>{" "}
            </div>
            <div className="mr-3">
              <label htmlFor="exchange" className="mr-3">
                exchange
              </label>
              <select id="exchange" defaultValue="select an exchange">
                <option value="select an exchange">select an exchange</option>
                <option value="binance">binance</option>
                <option value="gateio">gate.io</option>
                <option value="bitmart">bitmart</option>
              </select>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => this.addNewCoin()}
            >
              Create
            </button>
          </div> */}
      </div>
    </React.Fragment>
  );
};

export default Prices;
