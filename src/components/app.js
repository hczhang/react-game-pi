import React from "react";
import { Clock, Timer } from "./clock";
import { Board } from "./board";
import { ControlPanel } from "./control";
import { connect } from "react-redux";

const App = ({ state, handler }) => {
  return (
    <div className="game">
      <div className="game-board">
        <Clock />
        <Timer state={state} />
        <Board state={state} handler={handler} />
        <ControlPanel state={state} handler={handler} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { state: state.board };
  // return { state: state };
};

const mapDispatchToProps = dispatch => {
  return { handler: action => dispatch(action) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
