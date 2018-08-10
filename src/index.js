import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import { store } from "./store";
import "./index.css";

let unsubscribe = {};

const render = () => {
  ReactDOM.render(
    <App state={store.getState()} unsubscribe={unsubscribe} />,
    document.getElementById("root")
  );
};

render();

unsubscribe.fire = store.subscribe(render);
