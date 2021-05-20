import React, { Component } from "react";
import CanvasJSReact from "../../../CanvasJS/canvasjs.react";
import PriceFunctions from "../../Prices/CalculatePriceFunctions";
import { ThemeContext, themes } from "../../../Contexts/Theme";
import { connect } from "react-redux";
import MapStateToProps from "../../../Constants/MapStateToProps";

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
    //console.log(this.props.CoinList);
    let loaded = true;
    let port = 0;
    for (let i = 0; i < this.props.CoinList.length; ++i) {
      if (this.props.CoinList[i].priceNow === 0) {
        //console.log(this.props.CoinList[i].symbol);
        loaded = false;
      }
      port =
        port +
        parseFloat(
          PriceFunctions.calculateTotalHoldings(
            this.props.CoinList[i].tradingPair,
            this.props.CoinList[i].amount,
            this.props.CoinList[i].priceNow
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
    let value = this.context;
    let data = [];
    if (this.state.loaded) {
      for (let i = 0; i < this.props.CoinList.length; ++i) {
        data.push({
          name: this.props.CoinList[i].abbr.toUpperCase(),
          y:
            (parseFloat(
              PriceFunctions.calculateTotalHoldings(
                this.props.CoinList[i].tradingPair,
                this.props.CoinList[i].amount,
                this.props.CoinList[i].priceNow
              )
            ) /
              this.state.port) *
            100,
        });
      }

      data = data.sort(function (a, b) {
        return b.y - a.y;
      });
    }

    const options = {
      animationEnabled: true,
      title: {
        text: "Portfolio",
        fontColor: value.text,
      },
      backgroundColor: value.background,
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
          indexLabelFontColor: value.text,
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
PieChart.contextType = ThemeContext;
export default connect(MapStateToProps)(PieChart);
