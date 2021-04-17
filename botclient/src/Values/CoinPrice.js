import React from "react";
import axios from "axios";
import serverURL from "../configs/serverURL";
import CoinValues from "./CoinValues";

class CoinPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: props.symbol,
      price: 0,
      up: null,
      abbr: "",
    };
  }

  async getPrice() {
    try {
      const respond = await axios.get(
        //serverURL + "/coin/price?symbol=" + this.state.abbr.toUpperCase()
        serverURL +
          "/coin/price?symbol=" +
          this.state.symbol +
          "&exchange=" +
          this.props.exchange
      );
      const newPrice = respond.data.price;
      if (newPrice > this.state.price && this.state.price !== 0) {
        this.setState({ up: true }, () =>
          setTimeout(() => this.setState({ up: null }), 500)
        );
      } else if (newPrice < this.state.price) {
        this.setState({ up: false }, () =>
          setTimeout(() => this.setState({ up: null }), 500)
        );
      } else {
        this.setState({ up: null });
      }
      this.setState({ price: parseFloat(respond.data.price) });
    } catch (err) {}
  }

  async getPriceRepeatedly() {
    try {
      await this.getPrice();
      setTimeout(() => this.getPriceRepeatedly(), 1000);
    } catch (err) {}
  }

  getAbbreviationName() {
    const n = this.state.symbol.search("USDT");
    var abbr;
    if (this.state.symbol[n - 1] === "_") {
      abbr = this.state.symbol.substring(0, n - 1);
    } else abbr = this.state.symbol.substring(0, n);
    abbr = abbr.toLowerCase();
    this.setState({ abbr: abbr });
  }

  componentDidMount() {
    this.getPriceRepeatedly();
    this.getAbbreviationName();
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: this.props.showbg
            ? this.state.up == null
              ? "white"
              : this.state.up
              ? "lightgreen"
              : "red"
            : "white",
          border: "1px solid gold",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <img
          src={
            "/Asset/logos/" +
            this.state.abbr +
            (this.state.abbr === "pols" || this.state.abbr === "safemoon"
              ? ".jpeg"
              : ".png")
          }
          width="30"
          height="30"
          className="mr-1"
          alt={this.state.symbol}
        ></img>
        <CoinValues
          showname={this.props.showname}
          symbol={this.state.symbol}
          up={this.state.up}
          price={this.state.price}
          showbg={this.props.showbg}
          mode={this.props.mode}
          amount={this.props.amount}
          abbr={this.state.abbr.toUpperCase()}
        />
      </div>
    );
  }
}

export default CoinPrice;
