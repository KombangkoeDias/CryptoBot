var express = require("express");
var router = express.Router();
const CryptoBot = require("../LogicFiles/bot");
const cors = require("cors");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", cors(), async function (req, res, next) {
  const value = await CryptoBot.getCoinPrice("ADAUSDT");
  res.send({ port: value });
});

router.get("/all", cors(), async function (req, res, next) {
  const value = await CryptoBot.getAllCoinPrices();
  res.send(value);
});

module.exports = router;
