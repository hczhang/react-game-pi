import { TIMER } from "../components/const";
import { ActionCreators } from "redux-undo";

export const setTimerStatus = status => {
  return { type: ActionTypes.TIMER, status };
};

export const setSquareActive = active => {
  return { type: ActionTypes.ACTIVE, active };
};

export const setSquareControl = cmd => {
  if (cmd === "pause") return setTimerStatus(TIMER.PAUSED);
  if (cmd === "undo") return ActionCreators.undo();
  if (cmd === "redo") return ActionCreators.redo();
  return { type: ActionTypes.CONTROL, cmd };
};

export const ActionTypes = { TIMER: "TIMER", ACTIVE: "ACTIVE", CONTROL: "CONTROL" };
