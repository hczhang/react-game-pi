import React from "react";
import ReactDOM from "react-dom";
import { Clock, Timer } from "./components/clock";
import { Board } from "./components/board";
import { ControlPanel } from "./components/control";
import { store } from "./store";

import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.actionHandler = this.actionHandler.bind(this);
  }

  actionHandler(action) {
    store.dispatch(action);
  }

  componentWillUnmount() {
    unsubscribe();
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

const render = () => {
  ReactDOM.render(<Game state={store.getState()} />, document.getElementById("root"));
};

render();

let unsubscribe = store.subscribe(render);
