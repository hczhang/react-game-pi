import React from "react";
import { Clock, Timer } from "./clock";
import { Board } from "./board";
import { ControlPanel } from "./panel";
import { connect } from "react-redux";

const AppComp = props => {
  const themeClass = props.state.theme;
  return (
    <div className={"game-page " + themeClass}>
      <div className="game-area">
        <Clock />
        <Timer />
        <Board />
        <ControlPanel />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ state: state.board.present });
const mapDispatchToProps = dispatch => ({});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComp);
