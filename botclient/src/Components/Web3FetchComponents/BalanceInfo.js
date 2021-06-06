import React from "react";
import FetchFunctions from "./FetchFunctions";
import { themes, ThemeContext } from "../../Contexts/Theme";
import styles from "./BalanceInfo.module.css";

class BalanceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: null,
      ready: false,
      balance: 0,
      Address: this.props.address,
      datetime: null,
      stake_balance: null,
    };
  }

  componentDidMount() {
    setInterval(() => FetchFunctions[this.props.symbol].initialize(this), 5000);
  }

  render() {
    const value = this.context;
    return (
      <React.Fragment>
        <div
          className="row mt-3 ml-2 mr-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            color: value.text,
            backgroundColor: value.card,
            borderRadius: "20px",
            border: "2px solid gold",
          }}
        >
          {this.state.ready && (
            <React.Fragment>
              <div className={"col-2 " + styles.sueprCenter}>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  asset: {this.props.symbol}
                </p>
              </div>
              <div className={"col " + styles.sueprCenter}>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  balance: {this.state.balance} {this.props.symbol}
                </p>
              </div>
              <div className={"col " + styles.sueprCenter}>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  stake balance: {this.state.stake_balance} {this.props.symbol}
                </p>
              </div>
              <div className={"col " + styles.sueprCenter}>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  time: {this.state.datetime.toLocaleString()}
                </p>
              </div>
            </React.Fragment>
          )}

          {!this.state.ready && (
            <h4 style={{ color: value.text }}>Fetching...</h4>
          )}
        </div>
      </React.Fragment>
    );
  }
}

BalanceInfo.contextType = ThemeContext;

export default BalanceInfo;
