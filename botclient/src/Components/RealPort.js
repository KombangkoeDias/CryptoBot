import React, { useEffect, useState, useContext } from "react";
import CoinList from "../Coins/Coins";
import Coin from "../Coins/CoinClass";
import PriceCard from "../Components/Prices/PriceCard";
import Mode from "../Values/CoinValueMode";
import $ from "jquery";
import TotalPortFolio from "./SubComponents/TotalPortFolio/TotalPortFolio";
import PieChart from "./SubComponents/PieChart/PieChart";
import PriceFunctions from "./Prices/CalculatePriceFunctions";
import { ThemeContext, themes } from "../Contexts/Theme";

const RealPort = () => {
  const value = useContext(ThemeContext);
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
    <div style={{ backgroundColor: value.background, color: value.text }}>
      <TotalPortFolio />
      <PieChart />
      <div className="row">
        <div className="col">
          {CoinList.slice(0, Math.ceil(CoinList.length / 2)).map((coin, i) => (
            <div
              className="row ml-3 mb-1 "
              style={{
                display: "flex",
                justifyContent: "center",
                height: "40px",
              }}
            >
              <PriceCard
                updateCoinList={(symbol, info) =>
                  PriceFunctions.updateCoinList(symbol, info)
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
          ))}
        </div>
        <div className="col">
          {CoinList.slice(Math.ceil(CoinList.length / 2), CoinList.length).map(
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
                  updateCoinList={(symbol, info) =>
                    PriceFunctions.updateCoinList(symbol, info)
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
    </div>
  );
};

export default RealPort;
