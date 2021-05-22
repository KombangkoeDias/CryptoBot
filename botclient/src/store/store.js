import { createStore, applyMiddleware, combineReducers } from "redux";
import CoinListReducer from "./Reducers/CoinListReducers";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const Enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(CoinListReducer, Enhancer);

export default store;
