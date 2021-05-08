import React, { useState, useEffect } from "react";
import Coin from "../Coins/CoinClass";
import CoinList from "../Coins/Coins";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedByPercentage: [],
    };
  }
  letTest() {
    let sortedByPercentageList = [...CoinList].sort((a, b) => {
      return b.percentage - a.percentage;
    });
    this.setState({ sortedByPercentage: sortedByPercentageList });
    console.log("run");
    setTimeout(() => this.letTest(), 1000);
  }
  componentDidMount() {
    this.letTest();
  }
  render() {
    return (
      <React.Fragment>
        {" "}
        {this.state.sortedByPercentage.slice(0, 5).map((coin) => {
          return (
            <p key={coin.symbol}>
              {coin.symbol} : {coin.percentage.toFixed(2)} : {coin.side}
            </p>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Test;
