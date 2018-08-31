const PI =
  "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

// eslint-disable-next-line
const PI2 =
  "8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196";

export const BLUE_PRINT = PI.split("").map(e => +e);

export const TIMER = { INITIAL: "INITIAL", STARTED: "STARTED", PAUSED: "PAUSED" };

const CMD_KEYS = {
  9: "right",
  27: "esc",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  8: "backspace",
  46: "del"
};

export const getCmdByEvent = e => CMD_KEYS[e];

const CMD_STEPS = { up: -10, right: 1, down: 10, left: -1 };

export const isMoveCmd = cmd => !!CMD_STEPS[cmd];

const getUnboundNext = (i, cmd) => {
  if (cmd === "up") {
    i += i === 0 ? 99 : i <= 9 ? 89 : -10;
  } else if (cmd === "down") {
    i += i === 99 ? -99 : i >= 90 ? -89 : 10;
  } else if (cmd === "left") {
    i += i === 0 ? 99 : -1;
  } else if (cmd === "right") {
    i += i === 99 ? -99 : 1;
  }
  return i;
};

const getBoundNext = (i, cmd) => {
  const next = i + CMD_STEPS[cmd];
  return next < 0 || next > 99 ? i : next;
};

export const getMovedNext = getUnboundNext;

export const getSolvedNext = (i, direction) => {
  const cmd = { rightwards: "right", downwards: "down" }[direction];
  return !cmd || i === 99 ? i : getUnboundNext(i, cmd);
};
