import React, { useEffect, useState } from "react";
import CoinList from "../Coins/Coins";
import CoinPrice from "./Prices/PriceCard";
import Mode from "../Values/CoinValueMode";
import $ from "jquery";

const RealPort = () => {
  const [width, setWidth] = useState($(window).width());
  const [height, setHeight] = useState($(window).height());
  const [Prices, setPrices] = useState([]);

  useEffect(() => {
    $(window).on("resize", () => {
      setWidth($(window).width());
      setHeight($(window).height());
    });
  }, []);

  return (
    <div className="row">
      {/* <div className="col-6 col-md-3">
        {CoinList.slice(0, CoinList.length / 2).map((coin) => (
          <div
            className="row ml-3 mb-1"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "40px",
            }}
          >
            <CoinPrice
              Prices={Prices}
              symbol={coin.symbol}
              exchange={coin.exchange}
              showbg={false}
              showname={width > 1500 ? true : false}
              key={coin.symbol}
              mode={Mode.HOLDINGS}
              amount={coin.amount}
            />
          </div>
        ))}
      </div>
      <div className="col-6 col-md-3">
        {CoinList.slice(CoinList.length / 2, CoinList.length).map((coin) => (
          <div
            className="row ml-3 mb-1"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "40px",
            }}
          >
            <CoinPrice
              Prices={Prices}
              symbol={coin.symbol}
              exchange={coin.exchange}
              showbg={false}
              showname={width > 1500 ? true : false}
              key={coin.symbol}
              mode={Mode.HOLDINGS}
              amount={coin.amount}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default RealPort;
