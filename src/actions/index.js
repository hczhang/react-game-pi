import { TIMER } from "../components/const";
import { ActionCreators as UndoActionCreators } from "redux-undo";

export const ActionTypes = {
  TIMER: "TIMER",
  ACTIVE: "ACTIVE",
  CONTROL: "CONTROL",
  HINT: "HINT",
  DIRECTION: "DIRECTION",
  THEME: "THEME"
};

const actions = {
  setTimer: status => ({ type: ActionTypes.TIMER, status }),
  activate: active => ({ type: ActionTypes.ACTIVE, active }),
  control: cmd => ({ type: ActionTypes.CONTROL, cmd }),
  hint: () => ({ type: ActionTypes.HINT }),
  pause: () => ({ type: ActionTypes.TIMER, status: TIMER.PAUSED }),
  theme: () => ({ type: ActionTypes.THEME }),
  undo: () => UndoActionCreators.undo(),
  redo: () => UndoActionCreators.redo(),
  rightwards: cmd => ({ type: ActionTypes.DIRECTION, cmd }),
  downwards: cmd => ({ type: ActionTypes.DIRECTION, cmd })
};

export const ActionCreators = {
  ...actions,
  get: cmd => (actions[cmd] || actions.control)(cmd)
};
