import React from "react";
import ReactDOM from "react-dom";
import { PI, CTRL_KEYS, CTRL_STEPS } from "./components/const";
import { Clock, Timer } from "./components/clock";
import { Square } from "./components/squares";
import { ControlPanel } from "./components/control";
import { createStore } from "redux";
import "./index.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.blueprint = PI.split("");
    this.activeSquare = null;
    this.isStarted = false;
    this.state = { squares: Array(100).fill(""), active: 0 };
    this.squares = Array(100);
  }

  changeState(state) {
    if (!this.isStarted && state.squares) {
      this.props.onStart();
      this.isStarted = true;
    }
    if (this.isSolved(state)) this.props.onStop();
    this.setState(state);
  }

  isSolved(state) {
    if (!state.squares) return false;
    let checksquares = state.squares.slice(0, 10);
    return !checksquares.some((el, i) => el !== +this.blueprint[i]);
  }

  renderSquare(i) {
    const isActive = this.state.active === i;
    const isSolved = this.state.squares[i] === +this.blueprint[i];
    return (
      <Square
        ref={comp => (this.squares[i] = comp)}
        key={i}
        position={i}
        active={isActive}
        solved={isSolved}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        onKeyDown={e => this.handleKeyDown(e)}
        onKeyPress={e => this.handleKeyPress(e)}
      />
    );
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.squares[this.state.active]).focus();
  }

  handleClick(i) {
    this.changeState({ active: i });
  }

  /** Keyboard control keys */
  handleKeyDown(e) {
    let cmd = CTRL_KEYS[e.keyCode];
    if (!cmd) return;
    e.preventDefault();
    this.handleControl(cmd);
  }

  /** Keyboard press except control keys */
  handleKeyPress(e) {
    if (e.charCode >= 48 && e.charCode <= 57) {
      this.handleControl(e.charCode - 48);
    }
  }

  handleControl(cmd) {
    let squares = this.state.squares.slice();
    let i = this.state.active;

    // numbers
    if (cmd >= 0 && cmd <= 9) {
      squares[i] = cmd;
      this.changeState({ squares: squares });
      if (squares[i] === +this.blueprint[i]) {
        this.changeState({ active: Math.min(i + 1, 99) });
      }
    }
    // arrows left/up/right/down
    else if (CTRL_STEPS[cmd]) {
      i += CTRL_STEPS[cmd];
      if (i >= 0 && i <= 99) {
        this.changeState({ active: i });
      }
    }
    // hint
    else if (cmd === "hint") {
      if (!this.backup) {
        this.backup = this.state.squares.slice();
        this.changeState({ squares: this.blueprint.slice() });
      } else {
        this.changeState({ squares: this.backup.slice() });
        this.backup = null;
      }
    }
    // pause timer
    else if (cmd === "pause") {
      this.props.onStop();
    }
    // backspace
    else if (cmd === "backspace") {
      for (; i > 0 && squares[i] === ""; i--);
      squares[i] = "";
      this.changeState({ squares: squares, active: i });
    }
    // delete
    else if (cmd === "del") {
      squares[i] = "";
      this.changeState({ squares: squares });
    }
    // clear all
    else if (cmd === "clear") {
      this.changeState({ squares: Array(100).fill(""), active: 0 });
    }
    // undo
    else if (cmd === "undo") {
    }
    // redo
    else if (cmd === "redo") {
    }
    // home
    else if (cmd === "home") {
      this.changeState({ active: i - (i % 10) });
    }
    // end
    else if (cmd === "end") {
      this.changeState({ active: i - (i % 10) + 9 });
    }
    // pageup
    else if (cmd === "pageup") {
      this.changeState({ active: i % 10 });
    }
    // pagedown
    else if (cmd === "pagedown") {
      this.changeState({ active: (i % 10) + 90 });
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
    this.board = React.createRef();
    this.timer = React.createRef();
    this.handleControl = this.handleControl.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  handleControl(cmd) {
    this.board.current.handleControl(cmd);
  }

  startTimer() {
    this.timer.current.start();
  }

  stopTimer() {
    this.timer.current.stop();
  }

  resetTimer() {
    this.timer.current.reset();
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Clock />
          <Timer ref={this.timer} />
          <Board ref={this.board} onStart={this.startTimer} onStop={this.stopTimer} />
          <ControlPanel clickHander={this.handleControl} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
