import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/appStore";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import App from "./App";

let persister = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
    <Router>
      <App />
    </Router>
    </PersistGate>
  </Provider>
);