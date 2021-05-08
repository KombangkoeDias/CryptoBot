import React from "react";
import Router from "./Routers/Main";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Router />
    </React.Fragment>
  );
}

export default App;
