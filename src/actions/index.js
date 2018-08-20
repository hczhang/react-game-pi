import { ActionTypes, TIMER } from "../components/const";
import { ActionCreators as UndoActionCreators } from "redux-undo";

const actions = {
  setTimer: status => ({ type: ActionTypes.TIMER, status }),
  activate: active => ({ type: ActionTypes.ACTIVE, active }),
  control: cmd => ({ type: ActionTypes.CONTROL, cmd }),
  hint: () => ({ type: ActionTypes.HINT }),
  pause: () => ({ type: ActionTypes.TIMER, status: TIMER.PAUSED }),
  undo: () => UndoActionCreators.undo(),
  redo: () => UndoActionCreators.redo()
};

export const ActionCreators = {
  ...actions,
  get: cmd => (actions[cmd] || actions.control)(cmd)
};
