import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
console.log("this is Redux // store :", store);
console.log("this is Redux // store.getState() :", store.getState());

export default store;
