import React from "react";
import ReactDOM from "react-dom";
import { Game } from "./components/app";
import { store } from "./store";
import "./index.css";

let unsubscribe = {};

const render = () => {
  ReactDOM.render(
    <Game state={store.getState()} unsubscribe={unsubscribe} />,
    document.getElementById("root")
  );
};

render();

unsubscribe.fire = store.subscribe(render);
