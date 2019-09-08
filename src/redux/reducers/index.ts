import { combineReducers, Reducer } from "redux";

import signin from "./signinReducer";

import { AppState } from "./initialState";

const rootReducer = combineReducers<AppState>({
  signinState: signin
});

export default rootReducer;
