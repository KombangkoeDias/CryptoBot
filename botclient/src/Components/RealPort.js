import React, { useEffect, useState } from "react";
import CoinList from "../Coins/Coins";
import Coin from "../Coins/CoinClass";
import PriceCard from "../Components/Prices/PriceCard";
import Mode from "../Values/CoinValueMode";
import $ from "jquery";
import TotalPortFolio from "./SubComponents/TotalPortFolio/TotalPortFolio";

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
      <TotalPortFolio />
      <div className="row">
        <div className="col">
          {CoinList.slice(0, CoinList.length / 2).map((coin, i) => (
            <div
              className="row ml-3 mb-1 "
              style={{
                display: "flex",
                justifyContent: "center",
                height: "40px",
              }}
            >
              <PriceCard
                updateCoinList={(info) => updateCoinList(i, info)}
                coin={coin}
                showbg={false}
                showname={true}
                key={coin.symbol}
                symbol={coin.symbol}
                amount={coin.amount}
                mode={Mode.HOLDINGS}
                abbr={coin.abbr}
              />
            </div>
          ))}
        </div>
        <div className="col">
          {CoinList.slice(CoinList.length / 2, CoinList.length).map(
            (coin, i) => (
              <div
                className="row ml-3 mb-1 mr-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "40px",
                }}
              >
                <PriceCard
                  updateCoinList={(info) =>
                    updateCoinList(i + CoinList.length / 2, info)
                  }
                  coin={coin}
                  showbg={false}
                  showname={true}
                  key={coin.symbol}
                  symbol={coin.symbol}
                  amount={coin.amount}
                  mode={Mode.HOLDINGS}
                  abbr={coin.abbr}
                />
              </div>
            )
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RealPort;
