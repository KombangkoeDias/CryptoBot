import "./App.css";
import React, { useState } from "react";
import CoinList from "./Coins/Coins";
import CoinPrice from "./Values/CoinPrice";
const Mode = {
  PRICE: "price",
  REAL_PORT: "real_port",
  BOT_PORT: "bot_port",
};
function App() {
  const [mode, setMode] = useState(Mode.PRICE);
  return (
    <div className="App">
      <div>
        <button onClick={() => setMode(Mode.PRICE)}>Price</button>
        <button onClick={() => setMode(Mode.REAL_PORT)}>Real Port</button>
        <button onClick={() => setMode(Mode.BOT_PORT)}>BOT Port</button>
      </div>
      {mode === Mode.PRICE &&
        CoinList.map((coin) => (
          <CoinPrice
            symbol={coin.symbol}
            exchange={coin.exchange}
            key={coin.symbol}
          />
        ))}
      {mode === Mode.REAL_PORT && <p>Real Port</p>}
      {mode === Mode.BOT_PORT && <p>BOT Port</p>}
    </div>
  );
}

export default App;
