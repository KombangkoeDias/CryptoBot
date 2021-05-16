import React, { useState, useEffect, useContext } from "react";
import styles from "./Navbar.module.css";
import { ThemeContext, themes } from "../Constants/Theme";

const Navbar = (props) => {
  const [pathState, setPathState] = useState("");

  const value = useContext(ThemeContext);

  const themeName = value === themes.dark ? "dark" : "light";

  console.log(value);

  useEffect(() => {
    let path = window.location.pathname;
    path = path.substring(1, path.length);
    setPathState(path);
  }, [window.location.pathname]);

  const colorGradient =
    value === themes.dark ? value.card : "radial-gradient(white, gold)";

  const boxShadow =
    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

  const linkStyle = {
    price: {
      background: pathState === "price" ? colorGradient : "transparent",
      boxShadow: pathState === "price" ? boxShadow : "none",
    },
    real_port: {
      background: pathState === "real_port" ? colorGradient : "transparent",
      boxShadow: pathState === "real_port" ? boxShadow : "none",
    },
    bot_port: {
      background: pathState === "bot_port" ? colorGradient : "transparent",
      boxShadow: pathState === "bot_port" ? boxShadow : "none",
    },
  };

  return (
    <nav
      className={
        "navbar navbar-expand-lg " + "navbar-" + themeName + " bg-" + themeName
      }
    >
      <a className="navbar-brand" href="/price">
        KBD Bot
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li
            className={"nav-item active mr-2 " + styles.linkItem}
            style={linkStyle.price}
          >
            <a className="nav-link" href="/price">
              Price
            </a>
          </li>
          <li
            className={"nav-item active mr-2 " + styles.linkItem}
            style={linkStyle.real_port}
          >
            <a className="nav-link" href="/real_port">
              Real Port
            </a>
          </li>
          <li
            className={"nav-item active mr-2 " + styles.linkItem}
            style={linkStyle.bot_port}
          >
            <a className="nav-link" href="/bot_port">
              Bot Port
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className={"nav-item active "}>
            <div
              className="nav-link"
              type="button"
              onClick={() => props.toggleTheme()}
              style={{ color: value === themes.dark ? "yellow" : "black" }}
            >
              <i className="fa fa-moon"></i>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
