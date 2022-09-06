import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import WORDS from "./reducers/words";
export default createStore(combineReducers({ WORDS }), applyMiddleware(thunk));
