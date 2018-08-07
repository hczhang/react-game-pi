import { createStore } from "redux";
import { reducer } from "../reducers";
import { TIMER } from "../components/const";

const initialState = {
  active: 0,
  squares: Array(100).fill(""),
  backup: null,
  timer: TIMER.INITIAL
};

export const store = createStore(reducer, initialState);
