import React from "react";
import { Clock, Timer } from "./clock";
import { Board } from "./board";
import { ControlPanel } from "./panel";

export const App = () => (
  <div className="game-page">
    <div className="game-area">
      <Clock />
      <Timer />
      <Board />
      <ControlPanel />
    </div>
  </div>
);
