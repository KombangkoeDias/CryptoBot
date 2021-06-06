import React, { useState } from "react";
import Router from "./Routers/Main";
import Navbar from "./Components/Navbar";
import { ThemeContext, themes } from "./Contexts/Theme";
import store from "./store/store";
import { fetchCoinList } from "./store/Reducers/CoinListReducers";

import { Provider } from "react-redux";

function App() {
  let existingTheme = "";
  if (localStorage.getItem("theme")) {
    switch (localStorage.getItem("theme")) {
      case "dark":
        existingTheme = themes.dark;
        break;
      case "light":
        existingTheme = themes.light;
        break;
    }
  } else {
    existingTheme = themes.dark;
    localStorage.setItem("theme", "dark");
  }

  const [theme, setTheme] = useState(existingTheme);

  store.dispatch(fetchCoinList);

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div style={{ backgroundColor: theme.background, height: "100vh" }}>
      <Provider store={store}>
        <ThemeContext.Provider value={theme}>
          <Navbar toggleTheme={toggleTheme} />
          <Router />
        </ThemeContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
