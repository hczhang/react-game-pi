import React from "react";
import { BLUE_PRINT, getCmdByEvent } from "./const";
import { ActionCreators } from "../actions";
import { connect } from "react-redux";

class SquareComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  /** Mouse click changes square focus. */
  handleClick() {
    if (this.props.state.backup) return;
    this.props.handler(ActionCreators.activate(this.props.position));
  }

  /** Keyboard control keys */
  handleKeyDown(e) {
    if (this.props.state.backup) return;
    let cmd = getCmdByEvent(e.keyCode);
    if (!cmd) return;
    e.preventDefault();
    this.props.handler(ActionCreators.control(cmd));
  }

  /** Keyboard press except control keys */
  handleKeyPress(e) {
    if (this.props.state.backup) return;
    if (e.charCode >= 48 && e.charCode <= 57) {
      this.props.handler(ActionCreators.control(e.charCode - 48));
    }
  }

  render() {
    let position = this.props.position;
    let value = this.props.state.squares[position];
    let isActive = this.props.position === this.props.state.active;
    let isSolved = BLUE_PRINT[position] === value;

    let squareClass = "square";
    squareClass += isActive ? " active" : "";
    squareClass += isSolved ? " solved" : "";

    return (
      <button
        className={squareClass}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
      >
        {value}
      </button>
    );
  }
}

const mapStateToProps = state => ({ state: state.board.present });
const mapDispatchToProps = dispatch => ({ handler: action => dispatch(action) });

export const Square = connect(
  mapStateToProps,
  mapDispatchToProps
)(SquareComp);
