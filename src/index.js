import React from "react";
import ReactDOM from "react-dom";
import { pi } from "./components/const";
import { Clock, Timer } from "./components/clock";
import { Square } from "./components/squares";
import { ControlPanel } from "./components/control";
import { createStore } from "redux";
import "./index.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.blueprint = pi.split("");
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
        onKeyDown={e => this.handleKeyDown(e, i)}
        onKeyPress={e => this.handleKeyPress(e, i)}
      />
    );
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.squares[this.state.active]).focus();
  }

  handleClick(i) {
    this.changeState({ active: i });
  }

  handleKeyDown(e, i) {
    let squares = this.state.squares.slice();
    let next = i;
    switch (e.keyCode) {
      case 37:
        next--;
        break;
      case 38:
        next -= 10;
        break;
      case 9:
      case 39:
        next++;
        break;
      case 40:
        next += 10;
        break;
      case 8:
        for (; next > 0 && squares[next] === ""; next--);
        squares[next] = "";
        this.changeState({ squares: squares, active: next });
        return;
      case 46:
        squares[i] = "";
        this.changeState({ squares: squares });
        return;
      default:
        return;
    }

    if (next !== i && next >= 0 && next <= 99) {
      e.preventDefault();
      this.changeState({ active: next });
    }
  }

  handleKeyPress(e, i) {
    let squares = this.state.squares.slice();
    if (e.charCode >= 48 && e.charCode <= 57) {
      squares[i] = e.charCode - 48;
      this.changeState({ squares: squares });
      if (squares[i] === +this.blueprint[i]) {
        this.changeState({ active: i + 1 });
      }
    }
  }

  handleControl(command) {
    let squares = this.state.squares.slice();
    let i = this.state.active;

    if (command >= 0 && command <= 9) {
      squares[i] = command;
      this.changeState({ squares: squares });
      if (squares[i] === +this.blueprint[i]) {
        this.changeState({ active: i + 1 });
      }
    } else if (command >= 37 && command <= 40) {
      let next = i;
      switch (command) {
        case 37:
          next--;
          break;
        case 38:
          next -= 10;
          break;
        case 39:
          next++;
          break;
        case 40:
          next += 10;
          break;
        default:
          break;
      }

      if (next !== i && next >= 0 && next <= 99) {
        this.changeState({ active: next });
      }
    } else if (command === 11) {
      for (; i > 0 && squares[i] === ""; i--);
      squares[i] = "";
      this.changeState({ squares: squares, active: i });
    } else if (command === 12) {
      squares[i] = "";
      this.changeState({ squares: squares });
    } else if (command === 13) {
      this.changeState({ squares: Array(100).fill(""), active: 0 });
    } else if (command === 14) {
    } else if (command === 15) {
    } else if (command === 20) {
      if (!this.backup) {
        this.backup = this.state.squares.slice();
        this.changeState({ squares: this.blueprint.slice() });
      } else {
        this.changeState({ squares: this.backup.slice() });
        this.backup = null;
      }
    } else if (command === 21) {
      this.props.onStop();
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
  }

  handleControl(command) {
    this.board.current.handleControl(command);
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
