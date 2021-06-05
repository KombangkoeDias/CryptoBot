import React, { useEffect, useState, useContext } from "react";
import PriceCard from "../Components/Prices/PriceCard";
import Mode from "../Values/CoinValueMode";
import $ from "jquery";
import TotalPortFolio from "./SubComponents/TotalPortFolio/TotalPortFolio";
import PieChart from "./SubComponents/PieChart/PieChart";
import PriceFunctions from "./Prices/CalculatePriceFunctions";
import { ThemeContext, themes } from "../Contexts/Theme";
import TradeComponent from "./SubComponents/TradeComponent/TradeComponent";
import { connect } from "react-redux";
import MapStateToProps from "../Constants/MapStateToProps";
import Charting from "./SubComponents/TradeComponent/Charting";
import store from "../store/store";
import { fetchRealPortData } from "../store/Reducers/CoinListReducers";

const RealPort = (props) => {
  const value = useContext(ThemeContext);
  const [width, setWidth] = useState($(window).width());
  const [height, setHeight] = useState($(window).height());

  useEffect(() => {
    $(window).on("resize", () => {
      setWidth($(window).width());
      setHeight($(window).height());
    });
    store.dispatch(fetchRealPortData);
  }, []);

  //console.log(props.RealPort);

  const filterZeroAmountRealPort = [
    ...props.RealPort.filter((coin) => coin.coin.amount !== 0),
  ];

  //console.log(filterZeroAmountRealPort.length);

  const OnlyCoinInstanceRealPort = [
    ...filterZeroAmountRealPort.map((coin) => coin.coin),
  ];

  return (
    <div
      style={{
        backgroundColor: value.background,
        color: value.text,
        overflowX: "hidden",
      }}
    >
      <TotalPortFolio />
      <PieChart CoinList={OnlyCoinInstanceRealPort} />
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
          {filterZeroAmountRealPort
            .slice(0, Math.ceil(filterZeroAmountRealPort.length / 2))
            .map((coin, i) => (
              <div
                className="row ml-3 mb-1 "
                key={coin.coin.symbol}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "50px",
                }}
              >
                <PriceCard
                  updateCoinList={(symbol, info) =>
                    PriceFunctions.updateRealPort(symbol, info)
                  }
                  coin={coin.coin}
                  showbg={false}
                  showname={true}
                  symbol={coin.coin.symbol}
                  amount={coin.coin.amount}
                  mode={Mode.HOLDINGS}
                  abbr={coin.coin.abbr}
                  logo={coin.logo}
                />
              </div>
            ))}
        </div>
        <div className="col">
          {filterZeroAmountRealPort
            .slice(
              Math.ceil(filterZeroAmountRealPort.length / 2),
              filterZeroAmountRealPort.length
            )
            .map((coin, i) => (
              <div
                className="row ml-3 mb-1 mr-2"
                key={coin.coin.symbol}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "50px",
                }}
              >
                <PriceCard
                  updateCoinList={(symbol, info) =>
                    PriceFunctions.updateRealPort(symbol, info)
                  }
                  coin={coin.coin}
                  showbg={false}
                  showname={true}
                  symbol={coin.coin.symbol}
                  amount={coin.coin.amount}
                  mode={Mode.HOLDINGS}
                  abbr={coin.coin.abbr}
                  logo={coin.logo}
                />
              </div>
            ))}
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
        <TradeComponent port={"real_port"} mode={"trade"} />
      </div>
      {/* <Charting /> */}
    </div>
  );
};

export default connect(MapStateToProps)(RealPort);
