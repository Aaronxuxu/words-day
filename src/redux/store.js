import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import WORDS from "./reducers/words";
import formModal from "./reducers/formModal";

export default createStore(
  combineReducers({ WORDS, formModal }),
  applyMiddleware(thunk)
);
