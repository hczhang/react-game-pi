import { BLUE_PRINT, CTRL_STEPS, TIMER, ActionTypes } from "../components/const";
import { combineReducers } from "redux";
import undoable, { groupByActionTypes } from "redux-undo";

// const timerStatusReducer = (state = TIMER.INITIAL, action) => {
//   switch (action.type) {
//     case "TIMER":
//       return action.status;
//     default:
//       return state;
//   }
// };

const initialState = {
  active: 0,
  squares: Array(100).fill(""),
  backup: null,
  status: TIMER.INITIAL
};

const checkSolved = squares => {
  return !squares.slice(0, 10).some((el, i) => el !== BLUE_PRINT[i]);
};

const boardReducer = (state = initialState, action) => {
  console.log(action);

  if (action.type === ActionTypes.TIMER) return { ...state, status: action.status };
  if (action.type === ActionTypes.ACTIVE) return { ...state, active: action.active };
  if (action.type !== ActionTypes.CONTROL || !action.cmd) return state;

  const cmd = action.cmd;
  const squares = state.squares.slice();
  let i = state.active;

  // numbers
  if (cmd >= 0 && cmd <= 9) {
    squares[i] = cmd;
    i = squares[i] === BLUE_PRINT[i] ? Math.min(i + 1, 99) : i;
    const timerStatus = checkSolved(squares) ? TIMER.PAUSED : TIMER.STARTED;
    return { ...state, squares, active: i, status: timerStatus };
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
    return { ...state, status: TIMER.PAUSED };
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
    return { ...state, squares: Array(100).fill(""), active: 0, status: TIMER.INITIAL };
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

// export default boardReducer;
// export default combineReducers({ board: boardReducer }); // Adds combineReducers.
console.log(groupByActionTypes);
export default combineReducers({
  board: undoable(boardReducer, {
    limit: false
    // filter: function filterActions(action, currentState, previousHistory) {
    //   return action.type === "CONTROL";
    // }
  })
}); // Adds undoable.

// When connect-ing a component,
// with a simple reducer, the state in 'mapStateToProps' is {state};
// with 'combineReducers', the state is {state: state.board};
// with 'undoable', the state is {state: state.board.present}.
