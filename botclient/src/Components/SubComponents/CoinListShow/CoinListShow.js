import React from "react";
import CoinLogo from "../../CoinImg/CoinLogo";
import styles from "./CoinListShow.module.css";
import { connect } from "react-redux";
import MapStateToProps from "../../../Constants/MapStateToProps";

class CoinListShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upList: [],
      downList: [],
    };
  }
  update() {
    let upListState = [...this.props.CoinList].filter((coin) => {
      return coin.side === "up";
    });
    upListState = [...upListState].sort((a, b) => {
      return b.percentage - a.percentage;
    });
    this.setState({ upList: upListState });
    let downListState = [...this.props.CoinList].filter((coin) => {
      return coin.side === "down";
    });
    downListState = [...downListState].sort((a, b) => {
      return b.percentage - a.percentage;
    });
    this.setState({ downList: downListState });
    // let sortedByPercentageList = [...CoinList].sort((a, b) => {
    //   return b.percentage - a.percentage;
    // });
    // this.setState({ sortedByPercentage: sortedByPercentageList });
    //console.log("run");
    setTimeout(() => this.update(), 1000);
  }
  componentDidMount() {
    this.update();
  }

  determineRankColor(i, list) {
    let isup = list === this.state.upList;
    switch (i) {
      case 0:
        return "gold";
      case 1:
        return "silver";
      case 2:
        return isup ? "lightgreen" : "pink";
      default:
        return isup ? "green" : "red";
    }
  }

  showLists(list) {
    let isup = list === this.state.upList;
    return (
      <div
        className={"col-6 " + styles.movers}
        style={{
          height: "300px",
          overflowY: "scroll",
          overflowX: "hidden",
          marginBottom: "10px",
          border: "2px solid green",
          borderRadius: "10px",
        }}
      >
        <div className="row">
          <div
            className="col-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "25px" }}>
              {isup ? "up" : "down"} {list.length} coins
            </p>
          </div>
          {list.map((coin, i) => {
            return (
              <div
                key={coin.symbol}
                className="col-12"
                style={{
                  backgroundColor: this.determineRankColor(i, list),
                  padding: "2px",
                  textAlign: "center",
                  color: isup ? "black" : "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: isup ? "2px solid lightgreen" : "1px solid red",
                  borderRadius: "10px",
                  marginBottom: "2px",
                }}
              >
                <CoinLogo coin={coin} />
                <p key={coin.symbol}>
                  {coin.abbr.toUpperCase()} : {coin.side}{" "}
                  {coin.percentage.toFixed(2)} % from {coin.basePrice} to{" "}
                  {coin.priceNow}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {" "}
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <div>
            <h3 style={{ textAlign: "center" }}>Top Movers</h3>
            <div className="row">
              {this.showLists(this.state.upList)}
              {this.showLists(this.state.downList)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(MapStateToProps)(CoinListShow);
