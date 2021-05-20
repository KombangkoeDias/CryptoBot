import { createChart, CrosshairMode } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import $ from "jquery";

const Charting = () => {
  const chartRef = useRef();

  const chartContainer = (
    <div
      className="row"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      ref={chartRef}
    ></div>
  );
  const createCharting = () => {
    const chart = createChart(chartRef.current, {
      width: $(document).width() * 0.8,
      height: 300,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData([
      { time: "2019-04-11", value: 80.01 },
      { time: "2019-04-12", value: 96.63 },
      { time: "2019-04-13", value: 76.64 },
      { time: "2019-04-14", value: 81.89 },
      { time: "2019-04-15", value: 74.43 },
      { time: "2019-04-16", value: 80.01 },
      { time: "2019-04-17", value: 96.63 },
      { time: "2019-04-18", value: 76.64 },
      { time: "2019-04-19", value: 81.89 },
      { time: "2019-04-20", value: 74.43 },
    ]);
  };

  useEffect(() => {
    createCharting();
  }, []);

  return chartContainer;
};

export default Charting;
