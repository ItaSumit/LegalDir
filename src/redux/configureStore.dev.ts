import { createStore, applyMiddleware, Store } from "redux";
import rootReducer from "./reducers";
import reduxImutableStateInvariant from "redux-immutable-state-invariant";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { AppState } from "../redux/reducers/initialState";
import { composeWithDevTools } from "redux-devtools-extension";

export function configureStore(): Store<AppState> {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk, reduxImutableStateInvariant(), logger)
    )
  );
}
