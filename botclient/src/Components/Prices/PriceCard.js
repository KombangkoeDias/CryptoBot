import React from "react";
import CoinValues from "../../Values/CoinTextValues";
import Modal from "../../Values/Modal/CoinInfoModal";
import Mode from "../../Values/CoinValueMode";
import PriceService from "../../Services/PriceService";
import CoinLogo from "../CoinImg/CoinLogo";
import Caret from "./Caret";

class PriceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        basePrice: 0,
        priceNow: 0,
        percentage: 0,
        side: null,
        percentage_range: [0, 0],
        price_range: [0, 0],
      },
      up: null,
    };
  }

  async getPriceRepeatedly() {
    try {
      const info = await PriceService.getInfo(
        this.props.abbr.toUpperCase() + "USDT"
      );
      //console.log(info);
      this.props.updateCoinList(info);
      if (this.state.info.priceNow !== 0) {
        if (info.priceNow > this.state.info.priceNow) {
          //console.log("up");
          this.setState({ up: true }, () =>
            setTimeout(() => this.setState({ up: null }), 500)
          );
        } else if (info.priceNow < this.state.info.priceNow) {
          //console.log("down");
          this.setState({ up: false }, () =>
            setTimeout(() => this.setState({ up: null }), 500)
          );
        }
      }
      info.percentage = parseFloat(info.percentage).toFixed(2);
      this.setState({ info: info });
      setTimeout(() => this.getPriceRepeatedly());
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getPriceRepeatedly();
  }

  CoinValues(Modal = false) {
    return (
      <CoinValues
        showname={this.props.showname}
        symbol={this.props.symbol}
        up={this.state.up}
        priceNow={this.state.info.priceNow}
        showbg={this.props.showbg}
        mode={Modal === false ? this.props.mode : Mode.MODAL}
        amount={this.props.amount}
        abbr={this.props.abbr.toUpperCase()}
        side={this.state.info.side}
        percentage={this.state.info.percentage}
      />
    );
  }

  render() {
    //console.log(this.props.priceNow);
    let color = "white";
    if (this.props.showbg) {
      if (this.state.up !== null) {
        if (this.state.up) {
          color = "lightgreen";
        } else {
          color = "red";
        }
      }
    }
    //console.log(color);

    return (
      <div
        type="button"
        data-toggle="modal"
        data-target={"#" + this.props.symbol + "modal"}
        className={color}
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: color,
          border: "1px solid gold",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <CoinLogo coin={this.props.coin} />
        {this.state.info.percentage !== 0 && this.props.mode === Mode.NORMAL && (
          <div
            id={this.props.symbol}
            style={{
              position: "absolute",
              top: "-10px",
              left: "0px",
              width: "50px",
              height: "30px",
              border: "1px solid gold",
              backgroundColor:
                this.state.info.side === "up" ? "lightgreen" : "red",
              borderRadius: "50%",
              fontSize: "13px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: this.state.info.side === "up" ? "black" : "white",
            }}
          >
            {this.state.info.percentage + "%"}
          </div>
        )}
        {this.props.mode === Mode.NORMAL && (
          <>
            {this.props.coin.symbol} : {this.state.info.priceNow}
          </>
        )}
        {this.props.mode == Mode.HOLDINGS && (
          <>
            {" "}
            {this.props.coin.amount} {this.props.coin.abbr.toUpperCase()} = ${" "}
            {(this.props.coin.amount * this.state.info.priceNow).toFixed(2)}
          </>
        )}{" "}
        <Caret
          up={this.state.up}
          mode={Mode.NORMAL}
          showbg={this.props.showbg}
        />
        <div
          className="modal fade"
          id={this.props.symbol + "modal"}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <Modal
            symbol={this.props.symbol}
            abbr={this.props.abbr}
            CoinValues={() => this.CoinValues(true)}
          />
        </div>
      </div>
    );
  }
}

export default PriceCard;
