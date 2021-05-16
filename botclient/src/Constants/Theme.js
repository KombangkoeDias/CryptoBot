import React from "react";
export const themes = {
  light: {
    background: "FFFDD0",
    card: "white",
  },
  dark: {
    background: "121212",
    card: "#808080",
  },
};

export const ThemeContext = React.createContext(themes.dark);
