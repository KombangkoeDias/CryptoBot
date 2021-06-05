import React from "react";
import Caret from "../../Prices/Caret";
import Mode from "../../../Values/CoinValueMode";
import { ThemeContext, themes } from "../../../Contexts/Theme";
import { connect } from "react-redux";
import MapStateToProps from "../../../Constants/MapStateToProps";

class TotalPortFolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portValue: 0,
      loaded: false,
      up: null,
    };
  }

  update() {
    let port = 0;
    let loaded = true;
    const filteredPort = this.props.RealPort.filter(
      (coin) => coin.coin.amount !== 0
    ); // as there can be coin with amount 0 (already sold all) in the port
    for (let i = 0; i < filteredPort.length; i++) {
      if (filteredPort[i].coin.priceNow === 0) {
        //console.log(CoinList[i].symbol);
        //console.log(filteredPort[i].coin.symbol);
        loaded = false;
      }
      port =
        port +
        filteredPort[i].coin.amount * filteredPort[i].coin.priceNow.toFixed(2);
    }
    this.setState({ loaded: loaded });
    if (port > this.state.portValue) {
      this.setState({ up: true }, () =>
        setTimeout(() => this.setState({ up: null }), 500)
      );
    } else if (port < this.state.portValue) {
      this.setState({ up: false }, () =>
        setTimeout(() => this.setState({ up: null }), 500)
      );
    }
    this.setState({ portValue: port.toFixed(2) });
    setTimeout(() => this.update(), 1000);
  }
  componentDidMount() {
    this.update();
  }

  render() {
    let value = this.context;
    return (
      <div className="row">
        <div
          className="col mb-3 mt-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            {this.state.loaded && (
              <React.Fragment>
                <h1 style={{ textAlign: "center" }}>Real Port Value</h1>
                <h3
                  style={{
                    textAlign: "center",
                    color:
                      this.state.up === null
                        ? value.text
                        : this.state.up
                        ? "green"
                        : "red",
                  }}
                >
                  $ {this.state.portValue}{" "}
                  <Caret
                    up={this.state.up}
                    amount={1}
                    mode={Mode.HOLDINGS}
                    showbg={false}
                  />
                </h3>
              </React.Fragment>
            )}
          </div>
          <div>
            {!this.state.loaded && (
              <React.Fragment>
                <h1 style={{ textAlign: "center" }}>Real Port Value</h1>
                <h3 style={{ textAlign: "center" }}>Loading...</h3>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
TotalPortFolio.contextType = ThemeContext;

export default connect(MapStateToProps)(TotalPortFolio);
