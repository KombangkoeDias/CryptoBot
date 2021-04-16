var express = require("express");
var router = express.Router();
const CryptoBot = require("../LogicFiles/bot");
const Coin = require("../LogicFiles/coin");
const cors = require("cors");
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/test", cors(), async function (req, res, next) {
//   const value = await CryptoBot.getCoinPrice("ADAUSDT");
//   res.send({ port: value });
// });

router.get("/all", cors(), async function (req, res, next) {
  const value = await CryptoBot.getAllCoinPrices();
  res.send(value);
});

router.get("/coin/price", cors(), async function (req, res, next) {
  try {
    const symbol = req.query.symbol.toString();
    var coin;
    if (req.query.exchange.toString() === "binance") {
      coin = new Coin(symbol);
    } else if (req.query.exchange.toString() === "gateio") {
      coin = new Coin(symbol, "gateio");
    } else if (req.query.exchange.toString() === "bitmart") {
      coin = new Coin(symbol, "bitmart");
    } else {
      res.send({ price: "no price data for this coin yet" });
    }
    //coin = new Coin(symbol);
    const value = await coin.getPrice();
    res.send({ price: value });
  } catch (err) {}
});

router.get("/test", cors(), async function (req, res) {
  const coin = new Coin("ETH");
  let value = await coin.getPrice();
  res.send({ price: value });
});

module.exports = router;
