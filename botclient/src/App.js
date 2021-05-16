import React, { useState } from "react";
import Router from "./Routers/Main";
import Navbar from "./Components/Navbar";
import { ThemeContext, themes } from "./Constants/Theme";

function App() {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  return (
    <React.Fragment>
      <ThemeContext.Provider value={theme}>
        <Navbar toggleTheme={toggleTheme} />
        <Router />
      </ThemeContext.Provider>
    </React.Fragment>
  );
}

export default App;
