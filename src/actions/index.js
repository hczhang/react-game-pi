import { ActionTypes } from "../components/const";

const setTimer = status => ({ type: ActionTypes.TIMER, status });
const activate = active => ({ type: ActionTypes.ACTIVE, active });
const control = cmd => ({ type: ActionTypes.CONTROL, cmd });

export const ActionCreators = { setTimer, activate, control };
