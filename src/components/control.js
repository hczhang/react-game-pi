import React from "react";
import Tappable from "react-tappable";
import ReactSVG from "react-svg";
import { ActionCreators } from "../actions";
import { connect } from "react-redux";

export const Holder = () => <button className="holder" />;

const ControlComp = props => {
  const canUndo = props.state.past && props.state.past.length > 0;
  const canRedo = props.state.future && props.state.future.length > 0;
  const canPause = props.state.present.status !== "PAUSED";
  const canControl = !props.state.present.backup;
  const isRightwards = props.state.present.direction === "rightwards";
  const isDownwards = props.state.present.direction === "downwards";
  let disabled = !!{
    undo: !canUndo,
    redo: !canRedo,
    pause: !canPause,
    rightwards: isRightwards,
    downwards: isDownwards
  }[props.cmd];
  disabled = disabled || (props.cmd !== "hint" && !canControl);

  return (
    <Tappable
      component="button"
      preventDefault
      stopPropagation
      className={"control"}
      disabled={disabled}
      onTap={
        disabled
          ? null
          : e => {
              props.handler(ActionCreators.get(props.cmd));
            }
      }
    >
      {isNaN(props.cmd) ? <ReactSVG src={"./images/" + props.cmd + ".svg"} /> : props.cmd}
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
