import React from "react";
import FetchFunctions from "./FetchFunctions";
import { themes, ThemeContext } from "../../Contexts/Theme";
import styles from "./BalanceInfo.module.css";
import CoinLogo from "../CoinImg/CoinLogo";

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
      available: true,
      reward: null,
    };
  }

  componentDidMount() {
    if (FetchFunctions[this.props.symbol]) {
      FetchFunctions[this.props.symbol].initialize(this);
      setInterval(
        () => FetchFunctions[this.props.symbol].initialize(this),
        15000
      );
    } else {
      this.setState({ available: false });
    }
  }

  getColor() {
    const mapping = {
      DOT: "#e50c7b",
      KSM: "#7c003e",
      CAKE: "#d1884f",
      PCX: "gold",
      ADA: "#385cb8",
      SOL: "#c139f4",
    };
    return mapping[this.props.symbol];
  }

  render() {
    const value = this.context;
    return (
      <React.Fragment>
        <div
          className={"row mt-3 ml-2 mr-2 " + styles.superCenter}
          style={{
            height: "100px",
            color: value.text,
            backgroundColor: value.card,
            borderRadius: "20px",
            border: "2px solid " + this.getColor(),
          }}
        >
          <div>
            {this.state.available && this.state.ready && (
              <p
                style={{
                  position: "fixed",
                  transform: "translate(5%,90%)",
                  fontSize: "10px",
                  marginBottom: "0px",
                  opacity: "0.5",
                }}
              >
                Account : {this.state.Address}
              </p>
            )}
          </div>
          {this.state.ready && this.state.available && (
            <React.Fragment>
              <div className={"col-2 " + styles.sueprCenter}>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  asset: <CoinLogo logo={this.props.logo} /> {this.props.symbol}
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
                  reward: {this.state.reward} {this.props.symbol}
                </p>
              </div>
              <div className={"col " + styles.sueprCenter}>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  time: {this.state.datetime.toLocaleString()}
                </p>
              </div>
            </React.Fragment>
          )}
          {!this.state.ready && this.state.available && (
            <h4 style={{ color: value.text }}>
              Fetching... <CoinLogo logo={this.props.logo} />
            </h4>
          )}

          {!this.state.available && (
            <h5 style={{ color: value.text }}>
              No Data For Asset <CoinLogo logo={this.props.logo} />{" "}
              {this.props.symbol} Yet
            </h5>
          )}
        </div>
      </React.Fragment>
    );
  }
}

BalanceInfo.contextType = ThemeContext;

export default BalanceInfo;
