import { composeWithDevTools } from "redux-devtools-extension";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import WORDS from "./reducers/words";
import formModal from "./reducers/formModal";
import userToken from "./reducers/userToken";
import user from "./reducers/user";
import jsonpAPI from "./reducers/jsonpAPI";
export default createStore(
  combineReducers({ WORDS, formModal, userToken, user, jsonpAPI }),
  composeWithDevTools(applyMiddleware(thunk))
);
