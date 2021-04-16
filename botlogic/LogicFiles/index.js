const Bot = require("../LogicFiles/bot");

const test = async () => {
  const value = await Bot.getCoinPrice("ADAUSDT");
  console.log(value);
};

const test2 = async () => {
  const value = await Bot.getAllCoinPrices();
  console.log(value);
};

//test();
test2();
