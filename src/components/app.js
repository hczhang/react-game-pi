import React from "react";
import { Clock, Timer } from "./clock";
import { Board } from "./board";
import { ControlPanel } from "./control";
import { store } from "../store";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.actionHandler = this.actionHandler.bind(this);
  }

  actionHandler(action) {
    store.dispatch(action);
  }

  componentWillUnmount() {
    this.props.unsubscribe.fire();
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Clock />
          <Timer state={this.props.state} />
          <Board state={this.props.state} handler={this.actionHandler} />
          <ControlPanel state={this.props.state} handler={this.actionHandler} />
        </div>
      </div>
    );
  }
}
