import React, { Component } from "react";
import CanvasJSReact from "../../../CanvasJS/canvasjs.react";
import CoinList from "../../../Coins/Coins";
import PriceFunctions from "../../Prices/CalculatePriceFunctions";
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      port: 1,
    };
  }

  update() {
    let loaded = true;
    let port = 0;
    for (let i = 0; i < CoinList.length; ++i) {
      if (CoinList[i].priceNow === 0) {
        //console.log(CoinList[i].symbol);
        loaded = false;
      }
      port =
        port +
        parseFloat(
          PriceFunctions.calculateTotalHoldings(
            CoinList[i].tradingPair,
            CoinList[i].amount,
            CoinList[i].priceNow
          )
        );
    }
    this.setState({ loaded: loaded, port: port.toFixed(2) });
    setTimeout(() => this.update(), 1000);
  }
  componentDidMount() {
    this.update();
  }
  render() {
    let data = [];
    for (let i = 0; i < CoinList.length; ++i) {
      data.push({
        name: CoinList[i].abbr.toUpperCase(),
        y:
          (parseFloat(
            PriceFunctions.calculateTotalHoldings(
              CoinList[i].tradingPair,
              CoinList[i].amount,
              CoinList[i].priceNow
            )
          ) /
            this.state.port) *
          100,
      });
    }

    data = data.sort(function (a, b) {
      return b.y - a.y;
    });

    const options = {
      animationEnabled: true,
      title: {
        text: "Porfolio",
      },
      subtitles: [
        {
          text: "",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "pie",
          showInLegend: false,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###.##'%'",
          dataPoints: data,
        },
      ],
    };
    return (
      <div>
        {this.state.loaded && (
          <div className="mb-3">
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
          </div>
        )}
        {!this.state.loaded && (
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="mb-3"
          >
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default PieChart;
