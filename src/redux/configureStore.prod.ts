import { createStore, applyMiddleware, Store } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { AppState } from "./reducers/initialState";

export function configureStore(): Store<AppState> {
  return createStore(rootReducer, applyMiddleware(thunk));
}
