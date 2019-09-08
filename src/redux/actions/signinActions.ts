import { AUTH } from "./actionTypes";
import { Signin } from "../models/asignin";
import { TokenDetail } from "../models/tokenDetail";
import { User } from "../models/user";
import { AppError } from "../models/appError";
import { Action, ActionCreator } from "redux";
import * as authapi from "../../api/authApi";
import { forIn, findKey } from "lodash";
import { loaderStartActionCreator } from "./loaderActions";

export interface ISigninSuccessAction extends Action<AUTH.SIGNIN_SUCCESS> {
  type: AUTH.SIGNIN_SUCCESS;
  payload: {
    tokenDetail: TokenDetail;
  };
}

export interface ISigninFailAction extends Action<AUTH.SIGNIN_FAIL> {
  type: AUTH.SIGNIN_FAIL;
  payload: {
    error: AppError;
  };
}

export interface ISignoutAction extends Action<AUTH.SIGN_OUT> {}

export type SigninActions =
  | ISigninSuccessAction
  | ISigninFailAction
  | ISignoutAction;

function isFormValid(signin: Signin): AppError {
  let error: AppError = { code: "" };
  error.details = { codes: {} };
  let codes: any = {};
  Object.keys(signin).map((k: any) => {
    codes[k] = [];
  });
  error.details.codes = codes;

  if (!signin.email) {
    error.details.codes.email.push("EmailRequired");
  }
  if (!signin.password) {
    error.details.codes.password.push("PasswordRequired");
  }

  return error;
}

export const signinActionCreator: ActionCreator<any> = (signin: Signin) => {
  return async (dispatch: any) => {
    dispatch(loaderStartActionCreator(AUTH.SIGN_IN));
    let error = isFormValid(signin);

    let isAnyError =
      error &&
      error.details &&
      findKey(error.details.codes, function(o: any) {
        return o.length > 0;
      });

    if (isAnyError) {
      dispatch(signinFail(error));
    } else {
      return dispatch(authapi.signin(signin))
        .then((tokenDetail: any) => {
          let token = { userid: 0, token: tokenDetail.token };

          localStorage.setItem("token", JSON.stringify(token));
          dispatch(signinSuccess(token));
        })
        .catch((error: any) => {
          let errorDetail: AppError = {
            details: { codes: error.details && error.details.codes },
            code: error.code
          };
          dispatch(signinFail(errorDetail));
        });
    }
  };
};

export const signoutActionCreator: ActionCreator<any> = () => {
  return async (dispatch: any) => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(authapi.signout())
        .then(() => {})
        .finally(() => {
          localStorage.removeItem("token");
          dispatch(signout());
        });
    } else {
      dispatch(signout());
    }
  };
};

export function signinSuccess(tokenDetail: TokenDetail): ISigninSuccessAction {
  return {
    type: AUTH.SIGNIN_SUCCESS,
    payload: {
      tokenDetail
    }
  };
}

export function signinFail(error: AppError): ISigninFailAction {
  return {
    type: AUTH.SIGNIN_FAIL,
    payload: {
      error
    }
  };
}

export function signout(): ISignoutAction {
  return {
    type: AUTH.SIGN_OUT
  };
}
