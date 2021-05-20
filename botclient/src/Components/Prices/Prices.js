import React, { useState, useContext, useEffect } from "react";
import Coin from "../../Coins/CoinClass";
import PriceCard from "./PriceCard";
import Mode from "../../Values/CoinValueMode";
import CoinListShow from "../SubComponents/CoinListShow/CoinListShow";
import styles from "./Prices.module.css";
import PriceFunctions from "./CalculatePriceFunctions";
import { ThemeContext, themes } from "../../Contexts/Theme";
import { connect } from "react-redux";
import MapStateToProps from "../../Constants/MapStateToProps";
import ManageComponent from "../../Components/SubComponents/TradeComponent/TradeComponent";

const Prices = (props) => {
  // function addNewCoin() {
  //   const symbol = $("#symbol").val();
  //   const pair = $("#pair").val();
  //   const exchange = $("#exchange").val();
  //   CoinList.push(new Coin(symbol + pair, exchange));
  //   console.log(CoinList);
  // }
  const value = useContext(ThemeContext);

  const [display, setDisplay] = useState(4);
  const [modified_CoinList, setModifiedCoinList] = useState([]);
  const [CoinListState, setCoinListState] = useState([]);
  const [rankBy, setRankBy] = useState("Alphabet");
  const [load, setLoad] = useState(false);
  const [manage, setManage] = useState(true);

  const Manage = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    setManage(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setCoinListState(props.CoinList);
    if (props.CoinList.length !== 0 && modified_CoinList.length == 0) {
      setLoad(true);
      setModifiedCoinList(props.CoinList);
      RankBy(rankBy);
    }
  }, [props.CoinList]);

  const RankBy = (field) => {
    let tmp = [...props.CoinList];
    switch (field) {
      case "Price":
        tmp.sort((a, b) => b.priceNow - a.priceNow);
        break;
      case "Amount":
        tmp.sort((a, b) => b.amount - a.amount);
        break;
      case "Percentage":
        tmp.sort((a, b) => b.percentage - a.percentage);
        break;
      case "Total Value":
        tmp.sort(
          (a, b) =>
            parseFloat(
              PriceFunctions.calculateTotalHoldings(
                b.tradingPair,
                b.amount,
                b.priceNow
              )
            ) -
            parseFloat(
              PriceFunctions.calculateTotalHoldings(
                a.tradingPair,
                a.amount,
                a.priceNow
              )
            )
        );
        break;
      case "Alphabet":
        tmp.sort((a, b) => b.symbol - a.symbol);
        break;
    }
    setModifiedCoinList(tmp);
    setRankBy(field);
  };

  let RankConditions = [
    "Alphabet",
    "Price",
    "Amount",
    "Percentage",
    "Total Value",
  ];

  const buttonStyle = (val) => {
    return {
      backgroundColor: display === val ? "orange" : "white",
      width: "50px",
      borderRadius: "6px",
    };
  };

  const rankButtonStyle = (val) => {
    return {
      backgroundColor:
        rankBy === val
          ? value === themes.dark
            ? value.card
            : "gold"
          : "transparent",
      border: rankBy === val ? "1px solid gold" : "transparent",
      color: value.text,
    };
  };

  return (
    <React.Fragment>
      <div
        style={{
          overflowX: "hidden",
          backgroundColor: value.background,
          color: value.text,
        }}
      >
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: value.background,
          }}
        >
          <h2 className="mt-2">Coins in watchlist</h2>
        </div>
        <div
          className="row"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className={"btn mr-3 " + styles.displayButton}
            style={buttonStyle(3)}
            onClick={() => setDisplay(3)}
          >
            3
          </button>
          <button
            className={"btn mr-3 " + styles.displayButton}
            style={buttonStyle(4)}
            onClick={() => setDisplay(4)}
          >
            4
          </button>
          <button
            className={"btn mr-3 " + styles.displayButton}
            style={buttonStyle(6)}
            onClick={() => setDisplay(6)}
          >
            6
          </button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="mr-1">Rank By:</div>
            {RankConditions.map((cond) => {
              return (
                <button
                  key={cond}
                  className={"btn " + styles.displayButton}
                  style={rankButtonStyle(cond)}
                  onClick={() => RankBy(cond)}
                >
                  {cond}
                </button>
              );
            })}
            <button
              className={"btn " + styles.displayButton}
              style={{ color: "white" }}
              onClick={() => Manage()}
            >
              Manage
            </button>
          </div>
        </div>

        <div className="row ml-2 mr-2 mt-4">
          {modified_CoinList.map((coin) => (
            <div
              className={"col-" + 12 / display + " mb-3"}
              style={{
                width: "100vw",
                //height: {""},
                display: "flex",
                justifyContent: "center",
              }}
              key={coin.symbol}
            >
              <PriceCard
                updateCoinList={(symbol, info) =>
                  PriceFunctions.updateCoinList(symbol, info)
                }
                coin={coin}
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
        {!load && (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="spinner-border"
              role="status"
              style={{
                color: "white",
                width: "100px",
                height: "100px",
                fontSize: "30px",
              }}
            ></div>
          </div>
        )}
        {load && <CoinListShow />}
        {manage && (
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ManageComponent port={""} mode={"manage"} />
          </div>
        )}
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

export default connect(MapStateToProps)(Prices);
