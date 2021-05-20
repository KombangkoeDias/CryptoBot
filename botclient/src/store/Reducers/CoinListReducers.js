import Coin from "../../Coins/CoinClass";
import CoinService from "../../Services/CoinService";

function CoinListReducer(state = { CoinList: [] }, action) {
  switch (action.type) {
    case "update":
      return { ...state, CoinList: action.payload };
    default:
      return state;
  }
}

async function getCoinList() {
  let anotherCoinList = [];
  const data = await CoinService.getWatchList();
  let i = 0;
  for (const symbol in data) {
    anotherCoinList.push(
      new Coin(
        symbol,
        data[symbol]["exchange"],
        data[symbol]["amount"],
        //data[symbol]["logo"]
      )
    );
    i = i + 1;
  }
  return anotherCoinList;
}

export async function fetchCoinList(dispatch, getState) {
  const CoinList = await getCoinList();
  dispatch({ type: "update", payload: CoinList });
}

export default CoinListReducer;
