import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
console.log("this is Redux // store :", store);
console.log("this is Redux // store.getState() :", store.getState());

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
console.log("this is persistor// persistStore() :", persistor);
