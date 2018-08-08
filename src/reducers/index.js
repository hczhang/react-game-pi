import { BLUE_PRINT, CTRL_STEPS, TIMER } from "../components/const";

export const reducer = (state, action) => {
  console.log(action);

  const cmd = action.cmd;
  if (action.type === "mouse") return { ...state, active: cmd };
  if (action.type === "timer") return { ...state, timer: cmd };

  const checkSolved = squares => {
    return !squares.slice(0, 10).some((el, i) => el !== BLUE_PRINT[i]);
  };

  const squares = state.squares.slice();
  let i = state.active;

  // numbers
  if (cmd >= 0 && cmd <= 9) {
    squares[i] = cmd;
    i = squares[i] === BLUE_PRINT[i] ? Math.min(i + 1, 99) : i;
    const timerStatus = checkSolved(squares) ? TIMER.PAUSED : TIMER.STARTED;
    return { ...state, squares, active: i, timer: timerStatus };
  }
  // arrows left/up/right/down
  else if (CTRL_STEPS[cmd]) {
    i += CTRL_STEPS[cmd];
    if (i >= 0 && i <= 99) return { ...state, active: i };
  }
  // hint
  else if (cmd === "hint") {
    const sq = state.backup ? state.backup.slice() : BLUE_PRINT.slice();
    const bk = state.backup ? null : squares;
    return { ...state, squares: sq, backup: bk };
  }
  // pause timer
  else if (cmd === "pause") {
    return { ...state, timer: TIMER.PAUSED };
  }
  // backspace
  else if (cmd === "backspace") {
    for (; i > 0 && squares[i] === ""; i--);
    squares[i] = "";
    return { ...state, squares, active: i };
  }
  // delete
  else if (cmd === "del") {
    squares[i] = "";
    return { ...state, squares };
  }
  // clear all
  else if (cmd === "clear") {
    return { ...state, squares: Array(100).fill(""), active: 0, timer: TIMER.INITIAL };
  }
  // undo
  else if (cmd === "undo") {
  }
  // redo
  else if (cmd === "redo") {
  }
  // home
  else if (cmd === "home") {
    return { ...state, active: i - (i % 10) };
  }
  // end
  else if (cmd === "end") {
    return { ...state, active: i - (i % 10) + 9 };
  }
  // pageup
  else if (cmd === "pageup") {
    return { ...state, active: i % 10 };
  }
  // pagedown
  else if (cmd === "pagedown") {
    return { ...state, active: (i % 10) + 90 };
  }

  return state;
};
