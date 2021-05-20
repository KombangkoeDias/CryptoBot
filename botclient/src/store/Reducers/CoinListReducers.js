import Coin from "../../Coins/CoinClass";
import CoinService from "../../Services/CoinService";

function CoinListReducer(state = { CoinList: [], LogoList: {} }, action) {
  switch (action.type) {
    case "update":
      return { ...state, CoinList: action.payload };
    case "get_logo":
      return { ...state, LogoList: action.payload };
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

export default CoinListReducer;
