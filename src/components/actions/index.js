import { TIMER } from "../const";
export const setTimerStatus = status => {
  return { type: "TIMER", status };
};

export const setSquareActive = active => {
  return { type: "ACTIVE", active };
};

export const setSquareControl = cmd => {
  if (cmd === "pause") return setTimerStatus(TIMER.PAUSED);
  return { type: "CONTROL", cmd };
};
