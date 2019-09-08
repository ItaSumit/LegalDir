import { TokenDetail } from "../models/tokenDetail";
import { AppError } from "../models/appError";

let isLoggedin: boolean = false;
let tokenDetail: TokenDetail = { token: "", userid: 0 };

const token = localStorage.getItem("token");

if (token) {
  const parsedToken = JSON.parse(token);
  isLoggedin = true;
  tokenDetail = parsedToken;
}

export interface SigninState {
  token?: TokenDetail;
  isLoggedin: boolean;
  error?: AppError;
}

export const initialSigninState: SigninState = {
  isLoggedin: isLoggedin ? true : false,
  token: tokenDetail
};

export interface AppState {
  signinState: SigninState;
}
