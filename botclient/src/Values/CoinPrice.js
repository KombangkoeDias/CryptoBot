import React from "react";
import axios from "axios";
import serverURL from "../configs/serverURL";
import CoinValues from "./CoinTextValues";
import Modal from "./Modal/CoinInfoModal";

class CoinPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: props.symbol,
      price: 0,
      up: null,
      abbr: "",
      name_with_no_: "",
      basePrice: 0,
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

  getAbbreviationName(callBack) {
    const n = this.state.symbol.search("USDT");
    var abbr;
    if (this.state.symbol[n - 1] === "_") {
      abbr = this.state.symbol.substring(0, n - 1);
    } else abbr = this.state.symbol.substring(0, n);
    abbr = abbr.toLowerCase();
    this.setState({ abbr: abbr }, () => callBack());
  }

  getBasePrice() {
    this.setState({ basePrice: this.props.Prices[this.state.name_with_no_] });
  }

  calculatePercentage() {
    var newside = 0;
    var new_percentage = 0;
    var basePrice = this.props.Prices[this.state.abbr.toUpperCase() + "USDT"];
    if (this.state.price > 0 && basePrice > 0) {
      if (this.state.price >= basePrice) {
        newside = "up";
      } else {
        newside = "down";
      }
      new_percentage = (
        (Math.abs(this.state.price - basePrice) / basePrice) *
        100
      ).toFixed(2);
    }
    return { side: newside, percentage: new_percentage };
  }

  componentDidMount() {
    this.getPriceRepeatedly();
    this.getAbbreviationName(() => this.getBasePrice());
  }

  CoinValues() {
    return (
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
    );
  }

  render() {
    return (
      <div
        type="button"
        data-toggle="modal"
        data-target={"#" + this.state.symbol + "modal"}
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
        {this.calculatePercentage()["percentage"] !== 0 && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              left: "0px",
              width: "50px",
              height: "30px",
              border: "1px solid gold",
              backgroundColor:
                this.calculatePercentage()["side"] === "up"
                  ? "lightgreen"
                  : "red",
              borderRadius: "50%",
              fontSize: "13px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color:
                this.calculatePercentage()["side"] === "up" ? "black" : "white",
            }}
          >
            {this.calculatePercentage()["percentage"] + "%"}
          </div>
        )}

        {this.CoinValues()}
        <div
          className="modal fade"
          id={this.state.symbol + "modal"}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <Modal
            symbol={this.props.symbol}
            abbr={this.state.abbr}
            CoinValues={() => this.CoinValues()}
          />
        </div>
      </div>
    );
  }
}

export default CoinPrice;
