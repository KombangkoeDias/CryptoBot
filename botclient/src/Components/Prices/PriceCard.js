import React from "react";
import axios from "axios";
import serverURL from "../../configs/serverURL";
import CoinValues from "../../Values/CoinTextValues";
import Modal from "../../Values/Modal/CoinInfoModal";
import Mode from "../../Values/CoinValueMode";

class PriceCard extends React.Component {
  constructor(props) {
    super(props);
  }

  async getPriceRepeatedly() {
    try {
      await this.props.coin.fetchPriceNow();
      setTimeout(() => this.getPriceRepeatedly(), 1000);
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.props.coin.fetchBasePrice().then(() => {
      this.getPriceRepeatedly();
    });
  }

  CoinValues(Modal = false) {
    return (
      <CoinValues
        showname={this.props.showname}
        symbol={this.props.coin.symbol}
        up={this.props.coin.up}
        priceNow={this.props.coin.priceNow}
        showbg={this.props.showbg}
        mode={Modal === false ? this.props.mode : Mode.MODAL}
        amount={this.props.coin.amount}
        abbr={this.props.coin.abbr.toUpperCase()}
        side={this.props.coin.ide}
        percentage={this.props.coin.percentage}
      />
    );
  }

  render() {
    console.log(this.props.coin.priceNow);
    return (
      <div
        type="button"
        data-toggle="modal"
        data-target={"#" + this.props.coin.symbol + "modal"}
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: this.props.showbg
            ? this.props.coin.up == null
              ? "white"
              : this.props.coin.up
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
            this.props.coin.abbr +
            (this.props.coin.abbr === "pols" ||
            this.props.coin.abbr === "safemoon"
              ? ".jpeg"
              : ".png")
          }
          width="30"
          height="30"
          className="mr-1"
          alt={this.props.coin.symbol}
        ></img>
        {this.props.coin.percentage !== 0 && this.props.mode === Mode.NORMAL && (
          <div
            id={this.props.coin.symbol}
            style={{
              position: "absolute",
              top: "-10px",
              left: "0px",
              width: "50px",
              height: "30px",
              border: "1px solid gold",
              backgroundColor:
                this.props.coin.side === "up" ? "lightgreen" : "red",
              borderRadius: "50%",
              fontSize: "13px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: this.props.coin.side === "up" ? "black" : "white",
            }}
          >
            {this.props.coin.percentage + "%"}
          </div>
        )}

        {this.CoinValues()}
        <div
          className="modal fade"
          id={this.props.coin.symbol + "modal"}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <Modal
            symbol={this.props.coin.symbol}
            abbr={this.props.coin.abbr}
            CoinValues={() => this.CoinValues(true)}
          />
        </div>
      </div>
    );
  }
}

export default PriceCard;
