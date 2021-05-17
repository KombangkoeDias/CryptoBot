import React from "react";
export const themes = {
  light: {
    background: "#FFFDD0",
    card: "white",
    text: "black",
    selected: "gold",
  },
  dark: {
    background: "#121212",
    card: "#808080",
    text: "white",
    selected: "#1da1f2",
  },
};

export const ThemeContext = React.createContext(themes.dark);
