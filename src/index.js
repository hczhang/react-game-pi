import React from "react";
import ReactDOM from "react-dom";
import { BLUE_PRINT, CTRL_KEYS, TIMER } from "./components/const";
import { Clock, Timer } from "./components/clock";
import { Square } from "./components/squares";
import { ControlPanel } from "./components/control";
import { store } from "./store";

import "./index.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.isStarted = false;
    this.comps = Array(100);
  }

  renderSquare(i) {
    const isActive = this.props.state.active === i;
    const isSolved = this.props.state.squares[i] === +BLUE_PRINT[i];
    return (
      <Square
        ref={comp => (this.comps[i] = comp)}
        key={i}
        position={i}
        active={isActive}
        solved={isSolved}
        value={this.props.state.squares[i]}
        onClick={() => this.handleClick(i)}
        onKeyDown={e => this.handleKeyDown(e)}
        onKeyPress={e => this.handleKeyPress(e)}
      />
    );
  }

  changeState(state) {
    if (this.isSolved(state)) this.props.onStop();
    this.setState(state);
  }

  isSolved(state) {
    if (!state.squares) return false;
    let checksquares = state.squares.slice(0, 10);
    return !checksquares.some((el, i) => el !== +BLUE_PRINT[i]);
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.comps[this.props.state.active]).focus();
  }

  handleClick(i) {
    store.dispatch({ type: "mouse", active: i });
  }

  /** Keyboard control keys */
  handleKeyDown(e) {
    let cmd = CTRL_KEYS[e.keyCode];
    if (!cmd) return;
    e.preventDefault();
    store.dispatch({ type: "control", cmd });
  }

  /** Keyboard press except control keys */
  handleKeyPress(e) {
    if (e.charCode >= 48 && e.charCode <= 57) {
      store.dispatch({ type: "control", cmd: e.charCode - 48 });
    }
  }

  render() {
    return (
      <div>
        {"0123456789".split("").map(row => (
          <div key={"row" + row} className="board-row">
            {"0123456789".split("").map(col => this.renderSquare(+row * 10 + +col))}
          </div>
        ))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleControl = this.handleControl.bind(this);
  }

  handleControl(cmd) {
    store.dispatch({ type: "control", cmd });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Clock />
          <Timer status={this.props.state.timer} />
          <Board state={this.props.state} />
          <ControlPanel clickHandler={this.handleControl} />
        </div>
      </div>
    );
  }
}

const render = () =>
  ReactDOM.render(<Game state={store.getState()} />, document.getElementById("root"));

render();

store.subscribe(render);
