import React from "react";
import Coin from "../Coins/Coin";
import CoinList from "../Coins/Coins";
import CoinPrice from "../Values/CoinPrice";
import Mode from "../Values/CoinValueMode";
import $ from "jquery";
import EverydayPrice from "../Services/Everyday/EveryPrices";

class Prices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Prices: [],
    };
  }
  addNewCoin() {
    const symbol = $("#symbol").val();
    const pair = $("#pair").val();
    const exchange = $("#exchange").val();
    CoinList.push(new Coin(symbol + pair, exchange));
    console.log(CoinList);
  }

  componentDidMount() {
    EverydayPrice.getPrice().then((value) => {
      this.setState({ Prices: value });
    });
  }

  render() {
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
              key={coin.symbol}
            >
              <CoinPrice
                Prices={this.state.Prices}
                symbol={coin.symbol}
                exchange={coin.exchange}
                showbg={true}
                showname={true}
                key={coin.symbol}
                mode={Mode.NORMAL}
              />
            </div>
          ))}
        </div>
        <div className="row ml-3">
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
        </div>
      </React.Fragment>
    );
  }
}

export default Prices;
