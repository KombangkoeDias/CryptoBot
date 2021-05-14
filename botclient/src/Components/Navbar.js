import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [pathState, setPathState] = useState("");

  useEffect(() => {
    let path = window.location.pathname;
    path = path.substring(1, path.length);
    setPathState(path);
  }, [window.location.pathname]);

  const colorGradient = "radial-gradient(white, gold)";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
        <ul className="navbar-nav">
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
      </div>
    </nav>
  );
};

export default Navbar;
