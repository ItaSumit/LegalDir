import { LOADER } from "./actionTypes";
import { Action, ActionCreator } from "redux";
import { ISignoutAction } from "./signinActions";

export interface IStartAction extends Action<LOADER.START> {
  type: LOADER.START;
  payload: {
    actionName: string;
  };
}

export interface IErrorAction extends Action<LOADER.END> {
  type: LOADER.END;
  payload: {
    actionName: string;
  };
}

export type LoaderActions = IStartAction | IErrorAction | ISignoutAction;

function start(actionName: string): IStartAction {
  return {
    type: LOADER.START,
    payload: {
      actionName
    }
  };
}

function end(actionName: string): IErrorAction {
  return {
    type: LOADER.END,
    payload: {
      actionName
    }
  };
}

export const loaderStartActionCreator: ActionCreator<any> = (
  actionName: string
) => {
  return async (dispatch: any) => {
    dispatch(start(actionName));
  };
};

export const loaderEndActionCreator: ActionCreator<any> = (
  actionName: string
) => {
  return async (dispatch: any) => {
    dispatch(end(actionName));
  };
};
