import React, { useState } from "react";
import Router from "./Routers/Main";
import Navbar from "./Components/Navbar";
import { ThemeContext, themes } from "./Contexts/Theme";

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

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
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
