import { TIMER } from "../components/const";
import { ActionCreators as UndoActionCreators } from "redux-undo";

const setTimer = status => {
  return { type: ActionTypes.TIMER, status };
};

const activate = active => {
  return { type: ActionTypes.ACTIVE, active };
};

const control = cmd => {
  // if (cmd === "pause") return setTimer(TIMER.PAUSED);
  // if (cmd === "undo") return UndoActionCreators.undo();
  // if (cmd === "redo") return UndoActionCreators.redo();
  return { type: ActionTypes.CONTROL, cmd };
};

export const ActionTypes = { TIMER: "TIMER", ACTIVE: "ACTIVE", CONTROL: "CONTROL" };
export const ActionCreators = { setTimer, activate, control };
