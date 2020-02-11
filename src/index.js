import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { wpParamsReducer } from "./reducers/wpParamsReducer";
import { appStateReducer } from "./reducers/appStateReducer";
import { wpSetDataReducer } from "./reducers/wpSetDataReducer";
import App from "./App";
import { ThemeProvider } from "./ThemeContext";
import * as serviceWorker from "./serviceWorker";

const rootReducers = combineReducers({
  wpParamsReducer,
  wpSetDataReducer,
  appStateReducer
});

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger));

render(
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
