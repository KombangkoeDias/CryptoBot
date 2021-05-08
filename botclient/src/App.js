import React from "react";
import Router from "./Routers/Main";
import Navbar from "./Components/Navbar";
import Test from "./Test/CoinListShow";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Router />
      <Test />
    </React.Fragment>
  );
}

export default App;
