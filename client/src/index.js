import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
// import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import Reducer from "./_redux";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const storeAndmiddle = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk))
);

ReactDOM.render(
  <Provider store={storeAndmiddle}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.unregister();
