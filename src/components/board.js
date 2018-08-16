import React from "react";
import ReactDOM from "react-dom";
import { BLUE_PRINT, CTRL_KEYS } from "./const";
import { ActionCreators } from "../actions";
import { connect } from "react-redux";

class Square extends React.Component {
  render() {
    let squareClass = "square";
    squareClass += this.props.active ? " active" : "";
    squareClass += this.props.solved ? " solved" : "";

    return (
      <button
        className={squareClass}
        position={this.props.position}
        onClick={this.props.onClick}
        onKeyDown={this.props.onKeyDown}
        onKeyPress={this.props.onKeyPress}
      >
        {this.props.value}
      </button>
    );
  }
}

class BoardComp extends React.Component {
  constructor(props) {
    super(props);
    this.comps = Array(100);
    this.handler = this.props.handler;
  }

  renderSquare(i) {
    const isActive = this.props.state.active === i;
    const isSolved = this.props.state.squares[i] === BLUE_PRINT[i];
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

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.comps[this.props.state.active]).focus();
  }

  handleClick(i) {
    this.handler(ActionCreators.activate(i));
  }

  /** Keyboard control keys */
  handleKeyDown(e) {
    let cmd = CTRL_KEYS[e.keyCode];
    if (!cmd) return;
    e.preventDefault();
    this.handler(ActionCreators.control(cmd));
  }

  /** Keyboard press except control keys */
  handleKeyPress(e) {
    if (e.charCode >= 48 && e.charCode <= 57) {
      this.handler(ActionCreators.control(e.charCode - 48));
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

const mapStateToProps = state => ({ state: state.board.present });
const mapDispatchToProps = dispatch => ({ handler: action => dispatch(action) });

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardComp);
