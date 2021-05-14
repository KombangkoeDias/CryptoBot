import React from "react";
import CoinList from "../../../Coins/Coins";
import Caret from "../../Prices/Caret";
import Mode from "../../../Values/CoinValueMode";

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
    for (let i = 0; i < CoinList.length; ++i) {
      if (CoinList[i].priceNow === 0) {
        //console.log(CoinList[i].symbol);
        loaded = false;
      }
      port = port + CoinList[i].amount * CoinList[i].priceNow.toFixed(2);
    }
    this.setState({ loaded: loaded });
    port = port.toFixed(2);
    if (port > this.state.portValue) {
      this.setState({ up: true }, () =>
        setTimeout(() => this.setState({ up: null }), 500)
      );
    } else if (port < this.state.portValue) {
      this.setState({ up: false }, () =>
        setTimeout(() => this.setState({ up: null }), 500)
      );
    }
    this.setState({ portValue: port });
    setTimeout(() => this.update(), 1000);
  }
  componentDidMount() {
    this.update();
  }

  render() {
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
                        ? "black"
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

export default TotalPortFolio;
