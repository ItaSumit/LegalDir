import { AUTH } from "../actions/actionTypes";
import { SigninActions } from "../actions/signinActions";
import { initialSigninState, SigninState } from "./initialState";
import { Reducer } from "redux";

const signinReducer: Reducer<SigninState, SigninActions> = (
  state = initialSigninState,
  action
) => {
  switch (action.type) {
    case AUTH.SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload.tokenDetail,
        isLoggedin: true
      };
    case AUTH.SIGNIN_FAIL:
      return { ...state, error: action.payload.error, isLoggedin: false };
    case AUTH.SIGN_OUT:
      return {
        ...state,
        isLoggedin: false,
        token: undefined,
        error: undefined
      };
    default:
      return state;
  }
};

export default signinReducer;
