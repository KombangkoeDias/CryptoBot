import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  let path = window.location.pathname;
  path = path.substring(1, path.length);
  console.log(path);

  const colorGradient = "radial-gradient(white, gold)";

  const linkStyle = {
    price: {
      background: path === "price" ? colorGradient : "transparent",
    },
    real_port: {
      background: path === "real_port" ? colorGradient : "transparent",
    },
    bot_port: {
      background: path === "bot_port" ? colorGradient : "transparent",
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
