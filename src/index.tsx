import React from "react";
import ReactDOM from "react-dom";
import Browser from "webextension-polyfill";

import Popup from "./popup";

import "./index.css";

Browser.tabs.query({ active: true, currentWindow: true }).then(() => {
  ReactDOM.render(<Popup />, document.getElementById("root"));
});
