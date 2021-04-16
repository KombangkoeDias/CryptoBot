import logo from "./logo.svg";
import "./App.css";
import React from "react";
import PortValue from "./Values/PortValues";
import AllCoinsPrices from "./Values/AllCoinsPrices";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Port Value
        <PortValue />
      </header>
    </div>
  );
}

export default App;
