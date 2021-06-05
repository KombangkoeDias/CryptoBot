import Coin from "../../Coins/CoinClass";
import CoinService from "../../Services/CoinService";
import TradeDataService from "../../Services/TradeDataService";
import Transaction from "../../Transactions/Transaction";

function CoinListReducer(
  state = {
    CoinList: [],
    LogoList: {},
    TradeData: [],
    TransactionData: [],
    RealPort: [],
  },
  action
) {
  switch (action.type) {
    case "update":
      return { ...state, CoinList: action.payload };
    case "get_logo":
      return { ...state, LogoList: action.payload };
    case "update_trade_data":
      return { ...state, TradeData: action.payload };
    case "update_transaction_data":
      return { ...state, TransactionData: action.payload };
    case "update_real_port":
      return { ...state, RealPort: action.payload };
    // case "clear_bot_port":
    //   return { ...state, TradeData: [null], TransactionData: [null] };
    default:
      return state;
  }
}

async function getCoinList() {
  let anotherCoinList = [];
  let logoList = {};
  const data = await CoinService.getWatchList();
  let i = 0;
  for (const symbol in data) {
    anotherCoinList.push(
      new Coin(
        symbol,
        data[symbol]["exchange"],
        data[symbol]["amount"]
        //data[symbol]["logo"]
      )
    );
    logoList[symbol] = data[symbol]["logo"];
    i = i + 1;
  }
  return [logoList, anotherCoinList];
}

export async function fetchCoinList(dispatch, getState) {
  const [LogoList, CoinList] = await getCoinList();
  dispatch({ type: "update", payload: CoinList });
  dispatch({ type: "get_logo", payload: LogoList });
}

export async function fetchTradeData(dispatch, getState) {
  let TradeData = await TradeDataService.get_all_trade_data("bot_port");
  let TransactionData = [];
  if (TradeData[0] !== null) {
    // if it is then there's nothing in the port
    for (let i = 0; i < TradeData.length; i++) {
      let coin = TradeData[i];
      let logo = coin.port.logo;
      let symbol = coin.transactions.symbol;
      let exchange = coin.transactions.exchange;
      let transactions = coin.transactions.transactions;
      let buy_trade = transactions.buy;
      let sell_trade = transactions.sell;
      for (let j = 0; j < buy_trade.length; j++) {
        let trade = buy_trade[j];
        TransactionData.push(
          new Transaction(
            symbol,
            logo,
            exchange,
            trade.buy_price,
            "buy",
            trade.amount,
            new Date(Date.parse(trade.transaction_time))
          )
        );
      }
      for (let j = 0; j < sell_trade.length; j++) {
        let trade = sell_trade[j];
        TransactionData.push(
          new Transaction(
            symbol,
            logo,
            exchange,
            trade.sell_price,
            "sell",
            trade.amount,
            new Date(Date.parse(trade.transaction_time))
          )
        );
      }
    }
  }

  dispatch({ type: "update_trade_data", payload: TradeData });
  dispatch({ type: "update_transaction_data", payload: TransactionData });
}

export async function fetchRealPortData(dispatch, getState) {
  let TradeData = await TradeDataService.get_all_trade_data("real_port");
  let RealPort = [];
  if (TradeData[0] !== null) {
    for (let i = 0; i < TradeData.length; i++) {
      let coin = TradeData[i];
      let port = coin.port;
      let amount = port.amount;
      let avg_buy = port.average_buy;
      let logo = port.logo;
      let symbol = port.symbol;
      let exchange = port.exchange;
      let real_port_coin = {
        coin: new Coin(
          symbol,
          exchange,
          amount
          //data[symbol]["logo"]
        ),
        avg_buy: avg_buy,
        logo: logo,
      };
      RealPort.push(real_port_coin);
    }
  }
  dispatch({ type: "update_real_port", payload: RealPort });
}

export default CoinListReducer;
