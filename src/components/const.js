const PI =
  "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const PI2 =
  "8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196";

export const BLUE_PRINT = PI.split("").map(e => +e);

export const CTRL_KEYS = {
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

export const CTRL_STEPS = { up: -10, right: 1, down: 10, left: -1 };

export const MODE = { HOR: 0, VER: 1 };

export const TIMER = { INITIAL: "INITIAL", STARTED: "STARTED", PAUSED: "PAUSED" };
