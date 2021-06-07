import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import thunk from "redux-thunk";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { registerUserReducer, loginReducer } from "./reducers/userReducer";

const finalReducer = combineReducers({
  registerUserReducer,
  loginReducer,
});

const logger = createLogger();
const composeEnhancers = composeWithDevTools({});

const store = createStore(
  finalReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
