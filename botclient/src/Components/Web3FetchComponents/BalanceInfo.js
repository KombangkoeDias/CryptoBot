import React from "react";
import FetchFunctions from "./FetchFunctions";
import { themes, ThemeContext } from "../../Contexts/Theme";
import styles from "./BalanceInfo.module.css";
import CoinLogo from "../CoinImg/CoinLogo";
import $ from "jquery";

class BalanceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      window: {
        width: $(window).width(),
        height: $(window).height(),
      },
      api: null,
      ready: false,
      balance: 0,
      Address: this.props.address,
      datetime: null,
      stake_balance: null,
      available: true,
      reward: null,
      scan: "",
    };
  }

  getScan() {
    const mapping = {
      DOT: "https://polkascan.io/polkadot/account/",
      KSM: "https://polkascan.io/kusama/account/",
      CAKE: "https://bscscan.com/address/",
      PCX: "https://scan.chainx.org/accounts/",
      ADA: "https://cardanoscan.io/stakekey/",
      SOL: "https://explorer.solana.com/address/",
    };
    const scan = mapping[this.props.symbol] + this.props.address;
    this.setState({ scan: scan });
  }

  componentDidMount() {
    $(window).on("resize", () => {
      this.setState({
        window: { width: $(window).width(), height: $(window).height() },
      });
    });
    this.getScan();
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
          onClick={() => window.open(this.state.scan)}
          type="button"
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
              <div className={"col-2 " + styles.superCenter}>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  asset: <CoinLogo logo={this.props.logo} /> {this.props.symbol}
                </p>
              </div>
              {this.state.window.width > 800 && (
                <React.Fragment>
                  <div className={"col " + styles.superCenter}>
                    <p style={{ textAlign: "center", marginBottom: "0px" }}>
                      balance: <br /> {this.state.balance} {this.props.symbol}
                    </p>
                  </div>
                  <div className={"col " + styles.superCenter}>
                    <p style={{ textAlign: "center", marginBottom: "0px" }}>
                      stake balance: <br /> {this.state.stake_balance}{" "}
                      {this.props.symbol}
                    </p>
                  </div>
                </React.Fragment>
              )}
              <div className={"col " + styles.superCenter}>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  reward: <br /> {this.state.reward} {this.props.symbol}
                </p>
              </div>
              {this.state.window.width > 1000 && (
                <div className={"col " + styles.superCenter}>
                  <p style={{ textAlign: "center", marginBottom: "0px" }}>
                    time: {this.state.datetime.toLocaleString()}
                  </p>
                </div>
              )}
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
