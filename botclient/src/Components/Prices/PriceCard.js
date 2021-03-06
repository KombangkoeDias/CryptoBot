import React from "react";
import CoinValues from "../../Values/CoinTextValues";
import Modal from "../../Values/Modal/CoinInfoModal";
import Mode from "../../Values/CoinValueMode";
import PriceService from "../../Services/CoinService";
import CoinLogo from "../CoinImg/CoinLogo";
import Caret from "./Caret";
import PriceFunctions from "./CalculatePriceFunctions";
import { ThemeContext, themes } from "../../Contexts/Theme";
import CSS from "../../Constants/ConstantCSS";
import { connect } from "react-redux";
import MapStateToProps from "../../Constants/MapStateToProps";

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
        this.props.symbol,
        this.props.coin.exchange
      );
      //console.log(info);
      this.props.updateCoinList(this.props.symbol, info);
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
      console.log(this.props.symbol, err);
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
        info={this.state.info}
      />
    );
  }

  checkIfNLargestGain(n) {
    let upCoins = PriceFunctions.calculateLargeGains();
    if (upCoins.length < n) {
      return false;
    }
    return (
      this.checkIfLoaded() &&
      PriceFunctions.calculateLargeGains()[n - 1].symbol === this.props.symbol
    );
  }

  checkIfLoaded() {
    let load = true;
    for (let i = 0; i < this.props.CoinList.length; ++i) {
      if (this.props.CoinList[i].priceNow === 0) {
        load = false;
      }
    }
    return load;
  }

  showValue() {
    return this.state.info.priceNow;
  }

  render() {
    //console.log(this.props.priceNow);
    let value = this.context;
    let color = value.card;
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
          border:
            this.checkIfNLargestGain(1) && this.props.mode === Mode.NORMAL
              ? "3px solid gold"
              : this.checkIfNLargestGain(2) && this.props.mode === Mode.NORMAL
              ? "3px solid silver"
              : this.checkIfNLargestGain(3) && this.props.mode === Mode.NORMAL
              ? "3px solid #CD7F32"
              : "1px solid gold",
          boxShadow: CSS.boxShadow,
          color: value.text,
        }}
      >
        <CoinLogo coin={this.props.coin} logo={this.props.logo} />
        {this.state.info.percentage !== 0 && this.props.mode === Mode.NORMAL && (
          <React.Fragment>
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
            {this.checkIfNLargestGain(1) && (
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "30px",
                  transform: "rotate(30deg)",
                }}
              >
                <img
                  src="Asset/accessories/crown.png"
                  width="50"
                  height="50"
                ></img>
              </div>
            )}
          </React.Fragment>
        )}
        {this.props.mode === Mode.NORMAL && (
          <>
            {this.props.coin.symbolWithNoUnderscore} : {this.showValue()}
          </>
        )}
        {this.props.mode == Mode.HOLDINGS && (
          <>
            {" "}
            {this.props.coin.amount} {this.props.coin.abbr.toUpperCase()} = ${" "}
            {PriceFunctions.calculateTotalHoldings(
              this.props.coin.tradingPair,
              this.props.coin.amount,
              this.state.info.priceNow
            )}
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
            coin={this.props.coin}
            CoinValues={() => this.CoinValues(true)}
            logo={this.props.logo}
          />
        </div>
      </div>
    );
  }
}

PriceCard.contextType = ThemeContext;
export default connect(MapStateToProps)(PriceCard);
