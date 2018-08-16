import React from "react";
import Tappable from "react-tappable";
import { ActionCreators } from "../actions";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";
import { TIMER } from "./const";

export const Holder = () => <button className="holder" />;

const ControlComp = props => {
  const canUndo = props.state.past.length > 0;
  const canRedo = props.state.future.length > 0;
  const canPause = props.state.present.status !== "PAUSED";
  const disabled = { undo: !canUndo, redo: !canRedo, pause: !canPause }[props.cmd];

  let action;
  if (props.cmd === "undo") action = UndoActionCreators.undo();
  else if (props.cmd === "redo") action = UndoActionCreators.redo();
  else if (props.cmd === "pause") action = ActionCreators.setTimer(TIMER.PAUSED);
  else action = ActionCreators.control(props.cmd);

  return (
    <Tappable
      component="button"
      preventDefault
      stopPropagation
      className="control"
      style={props.style || {}}
      disabled={disabled}
      onTap={() => props.handler(action)}
    >
      {props.value}
    </Tappable>
  );

  /* return (
			<button className="control" onClick={() => this.props.onClick(this.props.cmd)}>
				{this.props.value}
			</button>
		); */
};

const mapStateToProps = state => ({ state: state.board });
const mapDispatchToProps = dispatch => ({ handler: action => dispatch(action) });

export const Control = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlComp);
