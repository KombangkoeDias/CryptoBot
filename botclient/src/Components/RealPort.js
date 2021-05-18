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
import TradeComponent from "./SubComponents/TradeComponent/TradeComponent";

const RealPort = () => {
  const value = useContext(ThemeContext);
  const [width, setWidth] = useState($(window).width());
  const [height, setHeight] = useState($(window).height());

  useEffect(() => {
    $(window).on("resize", () => {
      setWidth($(window).width());
      setHeight($(window).height());
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: value.background,
        color: value.text,
        overflowX: "hidden",
      }}
    >
      <TotalPortFolio />
      <PieChart />
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className="btn btn-secondary mb-2"
          style={{ width: "100px" }}
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          Edit
        </button>
      </div>
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
      <div
        className="row mt-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h3>Edit Portfolio</h3>
      </div>
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: value.background,
        }}
      >
        <TradeComponent port={"real_port"} />
      </div>
    </div>
  );
};

export default RealPort;
