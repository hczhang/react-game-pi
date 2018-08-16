import React from "react";
import { Clock, Timer } from "./clock";
import { Board } from "./board";
import { ControlPanel } from "./panel";

export const App = () => (
  <div className="game">
    <div className="game-board">
      <Clock />
      <Timer />
      <Board />
      <ControlPanel />
    </div>
  </div>
);
